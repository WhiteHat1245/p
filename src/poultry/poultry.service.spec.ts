import { Test, TestingModule } from '@nestjs/testing';
import { PoultryService } from './poultry.service';

describe('PoultryService', () => {
  let service: PoultryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoultryService],
    }).compile();

    service = module.get<PoultryService>(PoultryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
