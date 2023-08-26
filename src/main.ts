import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.use(json({ limit: '60mb' }));

  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('API NestJS')
    .setDescription(
      'Aqui esta la documentación del API del curso que estoy siguiendo',
    )
    .addTag('videos')
    .addTag('couses')
    .addTag('auth')
    .addTag('awards')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT);
  console.log(`LISTENING PROJECT ON PORT: [${process.env.PORT}]`);
}
bootstrap();
