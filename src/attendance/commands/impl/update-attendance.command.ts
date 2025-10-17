import { UpdateAttendanceDto } from '../../dto/update-attendance.dto';

export class UpdateAttendanceCommand {
  constructor(
    public readonly id: number,
    public readonly updateAttendanceDto: UpdateAttendanceDto,
  ) {}
}
