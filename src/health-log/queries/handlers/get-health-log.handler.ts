// src/health-log/queries/handlers/get-health-log.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { GetHealthLogQuery } from '../impl/get-health-log.query';
import { HealthLog } from 'src/Core Models/HealthLog';

@QueryHandler(GetHealthLogQuery)
export class GetHealthLogHandler implements IQueryHandler<GetHealthLogQuery> {
  constructor(
    @InjectRepository(HealthLog)
    private readonly healthLogRepository: Repository<HealthLog>,
  ) {}

  async execute(query: GetHealthLogQuery): Promise<HealthLog> {
    const { healthLogId } = query;
    const healthLog = await this.healthLogRepository.findOne({ where: { LogID: healthLogId }, relations: ['Poultry'] });
    if (!healthLog) {
      throw new NotFoundException(`HealthLog with ID ${healthLogId} not found`);
    }
    return healthLog;
  }
}