import { UpdateMaintenanceScheduleDto } from "src/maintenance-schedule/dto/update-maintenance-schedule.dto";

export class UpdateMaintenanceScheduleCommand {
  constructor(
    public readonly id: number,
    public readonly updateMaintenanceScheduleDto: UpdateMaintenanceScheduleDto,
  ) {}
}
