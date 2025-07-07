import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DOC_AUTH_TAG, DOC_AVALIATION_TAG, DOC_BEARER_AUTH, DOC_DESCRIPTION, DOC_IMAGE_TAG, DOC_TITLE, DOC_USER_TAG } from './doc/swagger-consts';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes( new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  const config =  new DocumentBuilder()
  .setTitle(DOC_TITLE)
  .setDescription(DOC_DESCRIPTION)
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http', scheme: 'bearer', bearerFormat: 'JWT'
    },
    DOC_BEARER_AUTH
  )
  .addTag(DOC_AUTH_TAG)
  .addTag(DOC_USER_TAG)
  .addTag(DOC_AVALIATION_TAG)
  .addTag(DOC_IMAGE_TAG)
  .build()

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('doc', app, document);

  app.enableCors({ origin: 'http://localhost:5173' });
  
  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
