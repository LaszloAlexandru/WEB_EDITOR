import { Test } from '@nestjs/testing';
import { DesignCrudService } from './design-crud.service';

describe('DesignCrudService', () => {
  let service: DesignCrudService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [DesignCrudService]
    }).compile();

    service = module.get(DesignCrudService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
