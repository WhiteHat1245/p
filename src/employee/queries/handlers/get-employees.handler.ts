// src/employee/queries/handlers/get-employees.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetEmployeesQuery } from '../impl/get-employees.query';
import { Employee } from 'src/Core Models/Employee ';

@QueryHandler(GetEmployeesQuery)
export class GetEmployeesHandler implements IQueryHandler<GetEmployeesQuery> {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async execute(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }
}