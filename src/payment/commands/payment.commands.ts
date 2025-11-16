
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { UpdatePaymentDto } from '../dto/update-payment.dto';
import { Payment } from 'src/Core Models/Payment';

// Create Command and Handler
export class CreatePaymentCommand {
  constructor(public readonly createPaymentDto: CreatePaymentDto) {}
}

@CommandHandler(CreatePaymentCommand)
export class CreatePaymentHandler implements ICommandHandler<CreatePaymentCommand> {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async execute(command: CreatePaymentCommand): Promise<Payment> {
    const payment = this.paymentRepository.create(command.createPaymentDto);
    return this.paymentRepository.save(payment);
  }
}

// Update Command and Handler
export class UpdatePaymentCommand {
  constructor(
    public readonly id: number,
    public readonly updatePaymentDto: UpdatePaymentDto,
  ) {}
}

@CommandHandler(UpdatePaymentCommand)
export class UpdatePaymentHandler implements ICommandHandler<UpdatePaymentCommand> {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async execute(command: UpdatePaymentCommand): Promise<Payment> {
    await this.paymentRepository.update(command.id, command.updatePaymentDto);
    const updatedPayment = await this.paymentRepository.findOneBy({ PaymentID: command.id });
    if (!updatedPayment) {
      throw new Error(`Payment with ID ${command.id} not found after update.`);
    }
    return updatedPayment;
  }
}

// Delete Command and Handler
export class DeletePaymentCommand {
  constructor(public readonly id: number) {}
}

@CommandHandler(DeletePaymentCommand)
export class DeletePaymentHandler implements ICommandHandler<DeletePaymentCommand> {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async execute(command: DeletePaymentCommand): Promise<void> {
    await this.paymentRepository.delete(command.id);
  }
}
