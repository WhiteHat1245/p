
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { UpdatePayrollDto } from './dto/update-payroll.dto';
import { CreatePayrollCommand, UpdatePayrollCommand, DeletePayrollCommand } from './commands/payroll-commands';
import { GetAllPayrollsQuery, GetPayrollByIdQuery } from './queries/payroll-queries';

@Controller('payroll')
export class PayrollController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() createPayrollDto: CreatePayrollDto) {
    return this.commandBus.execute(new CreatePayrollCommand(createPayrollDto));
  }

  @Get()
  findAll() {
    return this.queryBus.execute(new GetAllPayrollsQuery());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetPayrollByIdQuery(+id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePayrollDto: UpdatePayrollDto) {
    return this.commandBus.execute(new UpdatePayrollCommand(+id, updatePayrollDto));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandBus.execute(new DeletePayrollCommand(+id));
  }
}
