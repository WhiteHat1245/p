// src/employee/queries/handlers/get-employee.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { GetEmployeeQuery } from '../impl/get-employee.query';
import { Employee } from 'src/Core Models/Employee ';

@QueryHandler(GetEmployeeQuery)
export class GetEmployeeHandler implements IQueryHandler<GetEmployeeQuery> {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async execute(query: GetEmployeeQuery): Promise<Employee> {
    const { employeeId } = query;
    const employee = await this.employeeRepository.findOne({
      where: { EmployeeID: employeeId },
    });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    }
    return employee;
  }
}
