
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from 'src/Core Models/Payment';
import { Repository } from 'typeorm';

// Get All Query and Handler
export class GetAllPaymentsQuery {}

@QueryHandler(GetAllPaymentsQuery)
export class GetAllPaymentsQueryHandler implements IQueryHandler<GetAllPaymentsQuery> {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async execute(query: GetAllPaymentsQuery): Promise<Payment[]> {
    return this.paymentRepository.find();
  }
}

// Get By ID Query and Handler
export class GetPaymentByIdQuery {
  constructor(public readonly id: number) {}
}

@QueryHandler(GetPaymentByIdQuery)
export class GetPaymentByIdQueryHandler implements IQueryHandler<GetPaymentByIdQuery> {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async execute(query: GetPaymentByIdQuery): Promise<Payment | null> {
    return this.paymentRepository.findOneBy({ PaymentID: query.id });
  }
}
