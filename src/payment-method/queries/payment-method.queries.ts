
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethod } from 'src/Core Models/PaymentMethod';
import { Repository } from 'typeorm';

// Get All Query and Handler
export class GetAllPaymentMethodsQuery {}

@QueryHandler(GetAllPaymentMethodsQuery)
export class GetAllPaymentMethodsQueryHandler implements IQueryHandler<GetAllPaymentMethodsQuery> {
  constructor(
    @InjectRepository(PaymentMethod)
    private readonly paymentMethodRepository: Repository<PaymentMethod>,
  ) {}

  async execute(query: GetAllPaymentMethodsQuery): Promise<PaymentMethod[]> {
    return this.paymentMethodRepository.find();
  }
}

// Get By ID Query and Handler
export class GetPaymentMethodByIdQuery {
  constructor(public readonly id: number) {}
}

@QueryHandler(GetPaymentMethodByIdQuery)
export class GetPaymentMethodByIdQueryHandler implements IQueryHandler<GetPaymentMethodByIdQuery> {
  constructor(
    @InjectRepository(PaymentMethod)
    private readonly paymentMethodRepository: Repository<PaymentMethod>,
  ) {}

  async execute(query: GetPaymentMethodByIdQuery): Promise<PaymentMethod | null> {
    return this.paymentMethodRepository.findOneBy({ MethodID: query.id });
  }
}
