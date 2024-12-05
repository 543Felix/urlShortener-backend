import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UrlshortenerModule } from './urlshortener/urlshortener.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/urlShortener'),
    UrlshortenerModule,
  ],
  controllers: [UsersController],
  providers: [],
})
export class AppModule {}
