import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // 明确使用框架为express
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 解决跨域
  app.enableCors()
  // 启用静态文件托管功能，指定目录
  app.useStaticAssets('./uploads', {
    // 静态接口前缀
    prefix: '/uploads'
  })

  const options = new DocumentBuilder()
    .setTitle('multiStack-VideoWeb-后台管理API')
    .setDescription('供后台管理界面调用的服务端API')
    .setVersion('1.0')
    // .addTag('cats') // 接口文档的tag标签
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  // await app.listen(3000);
  const PORT = process.env.ADMIN_PORT || 3003
  await app.listen(PORT);
  // console.log('http://localhost:3000/api-docs')
  console.log(`http://localhost:${PORT}/api-docs`)
  console.log('process.env is ', process.env)
}
bootstrap();
