// src/health-log/queries/handlers/get-health-logs.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetHealthLogsQuery } from '../impl/get-health-logs.query';
import { HealthLog } from 'src/Core Models/HealthLog';

@QueryHandler(GetHealthLogsQuery)
export class GetHealthLogsHandler implements IQueryHandler<GetHealthLogsQuery> {
  constructor(
    @InjectRepository(HealthLog)
    private readonly healthLogRepository: Repository<HealthLog>,
  ) {}

  async execute(): Promise<HealthLog[]> {
    return this.healthLogRepository.find({ relations: ['Poultry'] });
  }
}