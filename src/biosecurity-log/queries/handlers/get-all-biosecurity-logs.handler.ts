import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetAllBiosecurityLogsQuery } from '../Impl/get-all-biosecurity-logs.query';
import { BiosecurityLog } from 'src/Core Models/BiosecurityLog';

@QueryHandler(GetAllBiosecurityLogsQuery)
export class GetAllBiosecurityLogsHandler
  implements IQueryHandler<GetAllBiosecurityLogsQuery, BiosecurityLog[]>
{
  constructor(
    @InjectRepository(BiosecurityLog)
    private readonly repository: Repository<BiosecurityLog>,
  ) {}

  async execute(query: GetAllBiosecurityLogsQuery): Promise<BiosecurityLog[]> {
    return this.repository.find();
  }
}
