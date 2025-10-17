// src/employee/commands/handlers/update-employee.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateEmployeeCommand } from '../impl/update-employee.command';
import { Employee } from 'src/Core Models/Employee ';

@CommandHandler(UpdateEmployeeCommand)
export class UpdateEmployeeHandler
  implements ICommandHandler<UpdateEmployeeCommand>
{
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async execute(command: UpdateEmployeeCommand): Promise<Employee> {
    const { id, updateEmployeeDto } = command;
    const employee = await this.employeeRepository.preload({
      EmployeeID: id,
      ...updateEmployeeDto,
    });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return this.employeeRepository.save(employee);
  }
}
