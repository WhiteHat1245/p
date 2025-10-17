
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateAttendanceCommand } from '../impl/update-attendance.command';
import { Attendance } from '../../../Core Models/Attendance';

@CommandHandler(UpdateAttendanceCommand)
export class UpdateAttendanceHandler implements ICommandHandler<UpdateAttendanceCommand> {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
  ) {}

  async execute(command: UpdateAttendanceCommand): Promise<Attendance> {
    const { id, updateAttendanceDto } = command;
    const attendance = await this.attendanceRepository.preload({
      AttendanceID: id,
      ...updateAttendanceDto,
    });
    if (!attendance) {
      throw new NotFoundException(`Attendance with ID ${id} not found`);
    }
    return this.attendanceRepository.save(attendance);
  }
}
