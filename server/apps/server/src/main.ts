import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 解决跨域
  app.enableCors()

  // web端接口文档
  const options = new DocumentBuilder()
    .setTitle('multiStack-VideoWeb-客户web端管理API')
    .setDescription('供客户web端界面调用的服务端API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  const PORT = process.env.SERVER_PORT || 3004
  await app.listen(PORT);

  console.log(`http://localhost:${PORT}/api-docs`)
}
bootstrap();
