import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: ['http://localhost:5173'],
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();