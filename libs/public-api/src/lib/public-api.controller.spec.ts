import { Test } from '@nestjs/testing';
import { PublicApiController } from './public-api.controller';
import { PublicApiService } from './public-api.service';

describe('PublicApiController', () => {
  let controller: PublicApiController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [PublicApiService],
      controllers: [PublicApiController]
    }).compile();

    controller = module.get(PublicApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
