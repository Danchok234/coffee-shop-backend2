import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe())
  const prismaService = app.get(PrismaService);
  app.enableCors()
  await prismaService.enableShutdownHooks(app);
  await app.listen(process.env.PORT || 4200);
}
bootstrap();
