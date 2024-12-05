import { Test, TestingModule } from '@nestjs/testing';
import { UrlshortenerService } from './urlshortener.service';

describe('UrlshortenerService', () => {
  let service: UrlshortenerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrlshortenerService],
    }).compile();

    service = module.get<UrlshortenerService>(UrlshortenerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
