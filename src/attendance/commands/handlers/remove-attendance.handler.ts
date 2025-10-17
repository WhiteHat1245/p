import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { RemoveAttendanceCommand } from '../impl/remove-attendance.command';
import { Attendance } from '../../../Core Models/Attendance';

@CommandHandler(RemoveAttendanceCommand)
export class RemoveAttendanceHandler
  implements ICommandHandler<RemoveAttendanceCommand>
{
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
  ) {}

  async execute(command: RemoveAttendanceCommand): Promise<void> {
    const { id } = command;
    const result = await this.attendanceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Attendance with ID ${id} not found`);
    }
  }
}
