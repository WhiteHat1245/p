
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentMethodDto } from '../dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from '../dto/update-payment-method.dto';
import { PaymentMethod } from 'src/Core Models/PaymentMethod';

// Create Command and Handler
export class CreatePaymentMethodCommand {
  constructor(public readonly createPaymentMethodDto: CreatePaymentMethodDto) {}
}

@CommandHandler(CreatePaymentMethodCommand)
export class CreatePaymentMethodHandler implements ICommandHandler<CreatePaymentMethodCommand> {
  constructor(
    @InjectRepository(PaymentMethod)
    private readonly paymentMethodRepository: Repository<PaymentMethod>,
  ) {}

  async execute(command: CreatePaymentMethodCommand): Promise<PaymentMethod> {
    const paymentMethod = this.paymentMethodRepository.create(command.createPaymentMethodDto);
    return this.paymentMethodRepository.save(paymentMethod);
  }
}

// Update Command and Handler
export class UpdatePaymentMethodCommand {
  constructor(
    public readonly id: number,
    public readonly updatePaymentMethodDto: UpdatePaymentMethodDto,
  ) {}
}

@CommandHandler(UpdatePaymentMethodCommand)
export class UpdatePaymentMethodHandler implements ICommandHandler<UpdatePaymentMethodCommand> {
  constructor(
    @InjectRepository(PaymentMethod)
    private readonly paymentMethodRepository: Repository<PaymentMethod>,
  ) {}

  async execute(command: UpdatePaymentMethodCommand): Promise<PaymentMethod> {
    await this.paymentMethodRepository.update(command.id, command.updatePaymentMethodDto);
    const updatedPaymentMethod = await this.paymentMethodRepository.findOneBy({ MethodID: command.id });
    if (!updatedPaymentMethod) {
      throw new Error(`PaymentMethod with ID ${command.id} not found after update.`);
    }
    return updatedPaymentMethod;
  }
}

// Delete Command and Handler
export class DeletePaymentMethodCommand {
  constructor(public readonly id: number) {}
}

@CommandHandler(DeletePaymentMethodCommand)
export class DeletePaymentMethodHandler implements ICommandHandler<DeletePaymentMethodCommand> {
  constructor(
    @InjectRepository(PaymentMethod)
    private readonly paymentMethodRepository: Repository<PaymentMethod>,
  ) {}

  async execute(command: DeletePaymentMethodCommand): Promise<void> {
    await this.paymentMethodRepository.delete(command.id);
  }
}
