import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async create(CreateUserDto: CreateUserDto) {
		return this.prisma.user.create({
			data: {
				username: CreateUserDto.username,
				password: CreateUserDto.password,
				email: CreateUserDto.email,
				refreshToken: CreateUserDto.refreshToken,
			},
		})
	}

	async findById(userId:number) {
		return this.prisma.user.findUnique({
			where: {
				id:userId
			}
		})
	}

	async findByUsername(username:string) {
		return this.prisma.user.findUnique({
			where: {
				username
			}
		})
	}

	async findByEmail(email: string) {
		return this.prisma.user.findFirst({
			where: {
				email
			}
		})
	}

	async update(userId:number,UpdateUserDto: UpdateUserDto) {
		return this.prisma.user.update({
			where: {
				id:userId
			},
			data: UpdateUserDto
		})
		
	}
}
