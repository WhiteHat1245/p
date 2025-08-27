// src/employee/commands/handlers/remove-employee.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { RemoveEmployeeCommand } from '../impl/remove-employee.command';
import { Employee } from 'src/Core Models/Employee ';

@CommandHandler(RemoveEmployeeCommand)
export class RemoveEmployeeHandler implements ICommandHandler<RemoveEmployeeCommand> {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async execute(command: RemoveEmployeeCommand): Promise<void> {
    const { id } = command;
    const result = await this.employeeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
  }
}