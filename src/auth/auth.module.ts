import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtAccessTokenStartegy } from './strategies/access-token.strategy'
import { JwtRefreshTokenStartegy } from './strategies/refresh-token.strategy'
import { PrismaService } from 'src/prisma.service'
import { UsersService } from 'src/users/users.service'

@Module({
  imports: [
    JwtModule.register({}),
    ConfigModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAccessTokenStartegy, JwtRefreshTokenStartegy, JwtService, PrismaService, UsersService]
})
export class AuthModule {}
