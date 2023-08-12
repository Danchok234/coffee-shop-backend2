import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class CreateUserDto {
	@IsNotEmpty()
	@IsString()
	@MinLength(8)
	username: string

	@IsEmail()
	@IsString()
	@IsNotEmpty()
	email: string

	@IsString()
	@IsNotEmpty()
	@MinLength(6)
	password: string

	refreshToken?: string
}
