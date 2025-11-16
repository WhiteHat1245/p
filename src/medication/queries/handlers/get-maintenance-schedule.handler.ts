import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { GetMaintenanceScheduleQuery } from '../impl/get-maintenance-schedule.query';
import { MaintenanceSchedule } from 'src/Core Models/MaintenanceSchedule';

@QueryHandler(GetMaintenanceScheduleQuery)
export class GetMaintenanceScheduleHandler implements IQueryHandler<GetMaintenanceScheduleQuery> {
  constructor(
    @InjectRepository(MaintenanceSchedule)
    private readonly repository: Repository<MaintenanceSchedule>,
  ) {}

  async execute(query: GetMaintenanceScheduleQuery): Promise<MaintenanceSchedule> {
    const { id } = query;
    const schedule = await this.repository.findOne({
      where: { ScheduleID: id },
      relations: ['Equipment'],
    });

    if (!schedule) {
      throw new NotFoundException(`MaintenanceSchedule with ID ${id} not found.`);
    }

    return schedule;
  }
}