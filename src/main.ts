import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import { AdminModule } from './admin/admin.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.enableCors({
    origin: true,
    credentials: true,
  });

  const adminConfig = new DocumentBuilder()
    .setTitle('Admin')
    .setVersion('1.0.0')
    .build();

  const admimDocument = SwaggerModule.createDocument(app, adminConfig, {
    include: [AdminModule],
    deepScanRoutes: true,
  });
  SwaggerModule.setup('docs/admin', app, admimDocument);

  app.setBaseViewsDir(join(__dirname, '../../templates/', 'views'));
  app.setViewEngine('hbs');

  await app.listen(3333);
}
bootstrap();
