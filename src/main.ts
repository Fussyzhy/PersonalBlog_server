import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config(); // 加载 .env 文件中的环境变量

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 启用CORS支持
  app.enableCors();
  // 监听端口
  const port = process.env.PORT || 7878;
  await app.listen(port, '::');

  const url = `http://localhost:${port}`;
  // 打印成功的地址
  console.warn('个人博客后端服务启动成功');
  console.log('服务端地址:'+`\x1b]8;;${url}\x1b\\${url}\x1b]8;;\x1b\\`);
}
bootstrap();
