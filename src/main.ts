import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:4200', // Replace with your Angular app's URL
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
