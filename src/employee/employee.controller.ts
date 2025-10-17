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
import { CommandBus, QueryBus } from '@nestjs/cqrs';

// استيراد الأوامر والاستعلامات
import { CreateEmployeeCommand } from './commands/impl/create-employee.command';
import { UpdateEmployeeCommand } from './commands/impl/update-employee.command';
import { RemoveEmployeeCommand } from './commands/impl/remove-employee.command';
import { GetEmployeeQuery } from './queries/impl/get-employee.query';
import { GetEmployeesQuery } from './queries/impl/get-employees.query';
import { CreateEmployeeDto } from './dto/create-employee.dto.ts/create-employee.dto.ts';
import { Employee } from 'src/Core Models/Employee ';
import { UpdateEmployeeDto } from './dto/update-employee.dto.ts/update-employee.dto.ts';

@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() dto: CreateEmployeeDto): Promise<Employee> {
    return this.commandBus.execute(new CreateEmployeeCommand(dto));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Employee> {
    return this.queryBus.execute(new GetEmployeeQuery(id));
  }

  @Get()
  findAll(): Promise<Employee[]> {
    return this.queryBus.execute(new GetEmployeesQuery());
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEmployeeDto,
  ): Promise<Employee> {
    return this.commandBus.execute(new UpdateEmployeeCommand(id, dto));
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.commandBus.execute(new RemoveEmployeeCommand(id));
  }
}
