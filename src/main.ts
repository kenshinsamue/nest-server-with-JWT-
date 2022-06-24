import { NestFactory } from '@nestjs/core';
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // set Global access prefix . I.E 127.0.0.1:3030/api
  app.setGlobalPrefix('api');

  // basic parameters for Swagger document
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(process.env.SWAGGER_NAME)
    .setDescription(process.env.SWAGGER_DESCRIPTION)
    .setVersion(process.env.SWAGGER_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app,options);
  SwaggerModule.setup('api',app, document);

  // enable cors
  app.enableCors()

  await app.listen(3030);
}
bootstrap();
