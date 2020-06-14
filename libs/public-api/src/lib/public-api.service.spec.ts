import { Test } from '@nestjs/testing';
import { PublicApiService } from './public-api.service';

describe('PublicApiService', () => {
  let service: PublicApiService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [PublicApiService]
    }).compile();

    service = module.get(PublicApiService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
