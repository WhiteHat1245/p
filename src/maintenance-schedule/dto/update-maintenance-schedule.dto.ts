import { PartialType } from '@nestjs/mapped-types';
import { CreateMaintenanceScheduleDto } from './create-maintenance-schedule.dto';

export class UpdateMaintenanceScheduleDto extends PartialType(
  CreateMaintenanceScheduleDto,
) {}
