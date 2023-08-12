import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { Request } from 'express'
import { AuthGuard } from '@nestjs/passport'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('signup')
	@HttpCode(HttpStatus.CREATED)
	signup(@Body() CreateUserDto: CreateUserDto) {
		return this.authService.signUp(CreateUserDto)
	}

	@Post('signin')
	@HttpCode(HttpStatus.OK)
	signin(@Body() AuthDto: AuthDto) {
		return this.authService.signIn(AuthDto)
	}

	@UseGuards(AuthGuard("jwt"))
	@Post('logout')
	@HttpCode(HttpStatus.OK)
	logout(@Req() req: Request) {
		this.authService.logout(req.user['sub'])
	}

	@UseGuards(AuthGuard("jwt-refresh"))
	@Get('refresh')
	refreshToken(@Req() req: Request) {
		const userId = req.user["sub"]
		const refreshToken = req.user["refreshToken"]
		return	this.authService.refreshTokens(userId, refreshToken)
	}
}
