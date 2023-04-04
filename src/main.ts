import { NestFactory } from '@nestjs/core';
import { RootModule } from './root.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(RootModule); //NestFactory is the abstraction of express.js and node.js

  
    const config = new DocumentBuilder()
      .setTitle('Marketplace example')
      .setDescription('The MARKETPLACE API description')
      .addTag('Marketplace API')
      .setVersion('1.0')
      .addBearerAuth({
        type:"http",
        scheme: "bearer",
        name: "JWT",
        description:"Enter JWT token",
        in: "header"
      },"JWT-auth")
    .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  
  await app.listen(5000);
}
bootstrap();
