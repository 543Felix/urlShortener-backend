import { Module } from '@nestjs/common';
import { UrlshortenerService } from './urlshortener.service';
import { UrlshortenerController } from './urlshortener.controller';
import { Url, UrlSchema } from 'src/schemas/url.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Url.name, schema: UrlSchema }]),
    JwtModule.register({
      secret: 'MyJwtSEcret2342134Ke*y*',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [UrlshortenerService],
  controllers: [UrlshortenerController],
})
export class UrlshortenerModule {}
