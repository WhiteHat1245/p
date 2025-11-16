import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetMaintenanceScheduleQuery } from '../impl/get-maintenance-schedule.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaintenanceSchedule } from 'src/Core Models/MaintenanceSchedule';

@QueryHandler(GetMaintenanceScheduleQuery)
export class GetMaintenanceScheduleHandler
  implements IQueryHandler<GetMaintenanceScheduleQuery>
{
  constructor(
    @InjectRepository(MaintenanceSchedule)
    private readonly maintenanceScheduleRepository: Repository<MaintenanceSchedule>,
  ) {}

  async execute(query: GetMaintenanceScheduleQuery) {
    const { id } = query;
    return this.maintenanceScheduleRepository.findOne({ where: { ScheduleID: id }, relations: ['details'] });
  }
}