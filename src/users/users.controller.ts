import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(+id, updateUserDto)
	}
	@Get()
	findByEmail(@Body() createUserDto: CreateUserDto) {
		return this.usersService.findByEmail(createUserDto.email)
	}
	@Get()
	findByUsername(@Body() createUserDto: CreateUserDto) {
		return this.usersService.findByUsername(createUserDto.username)
	}
}
