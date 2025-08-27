import { Test, TestingModule } from '@nestjs/testing';
import { HealthLogController } from './health-log.controller';

describe('HealthLogController', () => {
  let controller: HealthLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthLogController],
    }).compile();

    controller = module.get<HealthLogController>(HealthLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
