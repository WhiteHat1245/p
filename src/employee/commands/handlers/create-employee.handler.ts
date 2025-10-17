// src/employee/commands/handlers/create-employee.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeCommand } from '../impl/create-employee.command';
import { Employee } from 'src/Core Models/Employee ';

@CommandHandler(CreateEmployeeCommand)
export class CreateEmployeeHandler
  implements ICommandHandler<CreateEmployeeCommand>
{
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async execute(command: CreateEmployeeCommand): Promise<Employee> {
    const { createEmployeeDto } = command;
    const employee = this.employeeRepository.create(
      createEmployeeDto as Partial<Employee>,
    );
    return await this.employeeRepository.save(employee);
  }
}
