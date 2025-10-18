import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetBiosecurityLogByIdQuery } from '../Impl/get-biosecurity-log-by-id.query';
import { BiosecurityLog } from 'src/Core Models/BiosecurityLog';

@QueryHandler(GetBiosecurityLogByIdQuery)
export class GetBiosecurityLogByIdHandler
  implements IQueryHandler<GetBiosecurityLogByIdQuery>
{
  constructor(
    @InjectRepository(BiosecurityLog)
    private readonly repository: Repository<BiosecurityLog>,
  ) {}

  async execute(
    query: GetBiosecurityLogByIdQuery,
  ): Promise<BiosecurityLog | null> {
    const { id } = query;
    return await this.repository.findOneBy({ LogID: id });
  }
}
