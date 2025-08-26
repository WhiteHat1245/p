import { Test, TestingModule } from '@nestjs/testing';
import { PoultryController } from './poultry.controller';

describe('PoultryController', () => {
  let controller: PoultryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoultryController],
    }).compile();

    controller = module.get<PoultryController>(PoultryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
