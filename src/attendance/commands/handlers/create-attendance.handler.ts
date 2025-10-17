import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAttendanceCommand } from '../impl/create-attendance.command';
import { Attendance } from '../../../Core Models/Attendance';

@CommandHandler(CreateAttendanceCommand)
export class CreateAttendanceHandler
  implements ICommandHandler<CreateAttendanceCommand>
{
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
  ) {}

  async execute(command: CreateAttendanceCommand): Promise<Attendance> {
    const { createAttendanceDto } = command;
    const attendance = this.attendanceRepository.create(
      createAttendanceDto as Partial<Attendance>,
    );
    return this.attendanceRepository.save(attendance);
  }
}
