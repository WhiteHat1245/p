import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Controller('attendance')
export class AttendanceController {
  constructor() {}

  @Post()
  create(@Body() createAttendanceDto: CreateAttendanceDto) {
    return 'This action adds a new attendance';
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
    @Param('id') id: string,
    @Body() updateAttendanceDto: UpdateAttendanceDto,
  ) {
    return `This action updates a #${id} attendance`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} attendance`;
  }
}
