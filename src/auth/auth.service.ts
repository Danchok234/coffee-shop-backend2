import { BadRequestException, ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import * as argon2 from 'argon2'
import { PrismaService } from 'src/prisma.service'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { UsersService } from 'src/users/users.service'
import { AuthDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		private configService: ConfigService,
		private usersService: UsersService
	) {}

	hashPass(password: string) {
		return argon2.hash(password)
	}

	async signUp(CreateUserDto: CreateUserDto) {
		
		const isEmailTaken = await this.usersService.findByEmail(CreateUserDto.email)

		if (isEmailTaken) throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)

		const isUsernameTaken = await this.usersService.findByUsername(CreateUserDto.username)

		if (isUsernameTaken) throw new HttpException('This username is taken, please try another one', HttpStatus.BAD_REQUEST)

		const hash = await this.hashPass(CreateUserDto.password)

		const newUser = await this.usersService.create({ ...CreateUserDto, password: hash })
		const tokens = await this.getTokens(newUser.id, newUser.email)
		await this.updateRefreshToken(newUser.id, tokens.refreshToken)
		const returnObject = {
			...tokens,
			user: {
				id: newUser.id,
				email: newUser.email,
				username: newUser.username,
			},
		}
		return returnObject
	}

	async signIn(AuthDto: AuthDto) {
		const user = await this.usersService.findByEmail(AuthDto.email)
		if (!user) throw new BadRequestException('User isn`t exist, please register')
		const passwordMatches = await argon2.verify(user.password, AuthDto.password)
		if (!passwordMatches) throw new BadRequestException('Password is incorrect')
		const tokens = await this.getTokens(user.id, user.username)
		await this.updateRefreshToken(user.id, tokens.refreshToken)
		const returnObject = {
			...tokens,
			user: {
				id: user.id,
				email: user.email,
				username: user.username,
			},
		}
		return returnObject
	}

	logout(userId: number) {
		this.usersService.update(userId, { refreshToken: null })
	}

	async refreshTokens(userId: number, refreshToken: string) {
		const user = await this.usersService.findById(userId)
		console.log(user)
		if (!user || !user.refreshToken) throw new ForbiddenException('Access Denied, because no user was found')
		const refreshTokenMatches = await argon2.verify(user.refreshToken, refreshToken)
		if (!refreshTokenMatches) throw new ForbiddenException('Access Denied')
		const tokens = await this.getTokens(user.id, user.username)
		await this.updateRefreshToken(user.id, tokens.refreshToken)
		return tokens
	}

	async updateRefreshToken(userId: number, refreshToken: string) {
		const hashedRefreshToken = await this.hashPass(refreshToken)
		await this.usersService.update(userId, { refreshToken: hashedRefreshToken })
	}

	async getTokens(userId: number, email: string) {
		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(
				{
					sub: userId,
					email,
				},
				{
					secret: this.configService.get('ACCESS_SECRET'),
					expiresIn: '15m',
				}
			),
			this.jwtService.signAsync(
				{
					sub: userId,
					email,
				},
				{
					secret: this.configService.get('REFRESH_SECRET'),
					expiresIn: '7d',
				}
			),
		])
		return {
			accessToken,
			refreshToken,
		}
	}
}
