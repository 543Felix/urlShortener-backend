import { Test, TestingModule } from '@nestjs/testing';
import { UrlshortenerController } from './urlshortener.controller';

describe('UrlshortenerController', () => {
  let controller: UrlshortenerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlshortenerController],
    }).compile();

    controller = module.get<UrlshortenerController>(UrlshortenerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
