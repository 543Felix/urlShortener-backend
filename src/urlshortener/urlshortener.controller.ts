import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { UrlshortenerService } from './urlshortener.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('urlshortener')
export class UrlshortenerController {
  constructor(private readonly urlShortnerService: UrlshortenerService) {}
  @Post()
  @UseGuards(AuthGuard)
  async createShortUrl(@Body() data: { url: string }) {
    const { url } = data;
    return await this.urlShortnerService.createShortUrl(url);
  }
  @Post('preview')
  async getPreview(@Body() data: { url: string }) {
    console.log('data = ', data);
    return await this.urlShortnerService.getpreview(data.url);
  }
  @Get(':shortId')
  @UseGuards(AuthGuard)
  async navigateToDomain(@Param() data: { shortId: string }) {
    return await this.urlShortnerService.getUrl(data.shortId);
  }
}
