import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    })
  );

  const config = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('API - Chan')
  .setDescription('APIs Chan')
  .addTag('Users', 'User actions')
  .addTag('Categories', 'Category actions')
  .addTag('Boards', 'Board actions')
  .addTag('Threads', 'Thread actions')
  .addTag('Replies', 'Reply actions')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
