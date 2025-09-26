import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetEggProductionsQuery } from '../Impl/GetEggProductionsQuery';
import { EggProduction } from 'src/Core Models/EggProduction';

@QueryHandler(GetEggProductionsQuery)
export class GetEggProductionsHandler implements IQueryHandler<GetEggProductionsQuery> {
  constructor(
    @InjectRepository(EggProduction)
    private readonly eggProductionRepository: Repository<EggProduction>,
  ) {}

  async execute(query: GetEggProductionsQuery): Promise<EggProduction[]> {
    // جلب جميع سجلات إنتاج البيض مع تفاصيل الحظيرة
    return this.eggProductionRepository.find({ relations: ['Coop'] });
  }
}
