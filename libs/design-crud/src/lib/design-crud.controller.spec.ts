import { Test } from '@nestjs/testing';
import { DesignCrudController } from './design-crud.controller';
import { DesignCrudService } from './design-crud.service';

describe('DesignCrudController', () => {
  let controller: DesignCrudController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [DesignCrudService],
      controllers: [DesignCrudController]
    }).compile();

    controller = module.get(DesignCrudController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
