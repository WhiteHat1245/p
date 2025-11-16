
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GeneralLedger } from 'src/Core Models/GeneralLedger';
import { GetGeneralLedgersQuery } from '../impl/get-general-ledgers.query';

@QueryHandler(GetGeneralLedgersQuery)
export class GetGeneralLedgersHandler
  implements IQueryHandler<GetGeneralLedgersQuery>
{
  constructor(
    @InjectRepository(GeneralLedger)
    private readonly generalLedgerRepository: Repository<GeneralLedger>,
  ) {}

  async execute(query: GetGeneralLedgersQuery): Promise<GeneralLedger[]> {
    return this.generalLedgerRepository.find();
  }
}
