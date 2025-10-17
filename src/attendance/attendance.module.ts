import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { AttendanceController } from './attendance.controller';
import { Attendance } from '../Core Models/Attendance';
import { CreateAttendanceHandler } from './commands/handlers/create-attendance.handler';
import { UpdateAttendanceHandler } from './commands/handlers/update-attendance.handler';
import { RemoveAttendanceHandler } from './commands/handlers/remove-attendance.handler';
import { GetAttendancesHandler } from './queries/handlers/get-attendances.handler';
import { GetAttendanceHandler } from './queries/handlers/get-attendance.handler';

const CommandHandlers = [
  CreateAttendanceHandler,
  UpdateAttendanceHandler,
  RemoveAttendanceHandler,
];

const QueryHandlers = [GetAttendancesHandler, GetAttendanceHandler];

@Module({
  imports: [TypeOrmModule.forFeature([Attendance]), CqrsModule],
  controllers: [AttendanceController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class AttendanceModule {}
