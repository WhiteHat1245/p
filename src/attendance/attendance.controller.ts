import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { CreateAttendanceCommand } from './commands/impl/create-attendance.command';
import { UpdateAttendanceCommand } from './commands/impl/update-attendance.command';
import { RemoveAttendanceCommand } from './commands/impl/remove-attendance.command';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  create(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.commandBus.execute(
      new CreateAttendanceCommand(createAttendanceDto),
    );
  }

  @Get()
  findAll() {
    return 'This action returns all attendance';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} attendance`;
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAttendanceDto: UpdateAttendanceDto,
  ) {
    return this.commandBus.execute(
      new UpdateAttendanceCommand(id, updateAttendanceDto),
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.commandBus.execute(new RemoveAttendanceCommand(id));
  }
}
