import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateMaintenanceScheduleCommand } from '../impl/update-maintenance-schedule.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaintenanceSchedule } from 'src/Core Models/MaintenanceSchedule';

@CommandHandler(UpdateMaintenanceScheduleCommand)
export class UpdateMaintenanceScheduleHandler
  implements ICommandHandler<UpdateMaintenanceScheduleCommand>
{
  constructor(
    @InjectRepository(MaintenanceSchedule)
    private readonly maintenanceScheduleRepository: Repository<MaintenanceSchedule>,
  ) {}

  async execute(command: UpdateMaintenanceScheduleCommand) {
    const { id, updateMaintenanceScheduleDto } = command;
    const maintenanceSchedule = await this.maintenanceScheduleRepository.findOneBy({ ScheduleID: id });
    if (!maintenanceSchedule) {
      throw new Error('Maintenance Schedule not found');
    }

    // A more sophisticated implementation would handle details update here
    const updatedSchedule = this.maintenanceScheduleRepository.merge(
      maintenanceSchedule,
      updateMaintenanceScheduleDto as Partial<MaintenanceSchedule>,
    );

    return this.maintenanceScheduleRepository.save(updatedSchedule);
  }
}