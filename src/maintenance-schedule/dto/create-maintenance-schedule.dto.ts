import { IsDateString, IsString, IsNumber } from 'class-validator';

export class CreateMaintenanceScheduleDto {
  @IsNumber()
  equipmentId: number;

  @IsDateString()
  scheduledDate: Date;

  @IsString()
  maintenanceType: string;

  @IsString()
  status: string;
}
