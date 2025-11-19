
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Payroll } from '../../Core Models/Payroll';
import { Repository } from 'typeorm';

// Get All Query and Handler
export class GetAllPayrollsQuery {}

@QueryHandler(GetAllPayrollsQuery)
export class GetAllPayrollsQueryHandler implements IQueryHandler<GetAllPayrollsQuery> {
  constructor(
    @InjectRepository(Payroll)
    private readonly payrollRepository: Repository<Payroll>,
  ) {}

  async execute(query: GetAllPayrollsQuery): Promise<Payroll[]> {
    return this.payrollRepository.find();
  }
}

// Get By ID Query and Handler
export class GetPayrollByIdQuery {
  constructor(public readonly id: number) {}
}

@QueryHandler(GetPayrollByIdQuery)
export class GetPayrollByIdQueryHandler implements IQueryHandler<GetPayrollByIdQuery> {
  constructor(
    @InjectRepository(Payroll)
    private readonly payrollRepository: Repository<Payroll>,
  ) {}

  async execute(query: GetPayrollByIdQuery): Promise<Payroll | null> {
    return this.payrollRepository.findOneBy({ PayrollID: query.id });
  }
}
