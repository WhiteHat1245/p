import { CreateAttendanceDto } from '../../dto/create-attendance.dto';

export class CreateAttendanceCommand {
  constructor(public readonly createAttendanceDto: CreateAttendanceDto) {}
}
