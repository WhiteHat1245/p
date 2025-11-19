
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePayrollDto } from '../dto/create-payroll.dto';
import { UpdatePayrollDto } from '../dto/update-payroll.dto';
import { Payroll } from '../../Core Models/Payroll';

// Create Command and Handler
export class CreatePayrollCommand {
  constructor(public readonly createPayrollDto: CreatePayrollDto) {}
}

@CommandHandler(CreatePayrollCommand)
export class CreatePayrollHandler implements ICommandHandler<CreatePayrollCommand> {
  constructor(
    @InjectRepository(Payroll)
    private readonly payrollRepository: Repository<Payroll>,
  ) {}

  async execute(command: CreatePayrollCommand): Promise<Payroll> {
    const payroll = this.payrollRepository.create(command.createPayrollDto as any);
    const saved = await this.payrollRepository.save(payroll);
    if (Array.isArray(saved)) {
      if (saved.length === 0) {
        throw new Error('Failed to save payroll.');
      }
      return saved[0];
    }
    return saved;
  }
}

// Update Command and Handler
export class UpdatePayrollCommand {
  constructor(
    public readonly id: number,
    public readonly updatePayrollDto: UpdatePayrollDto,
  ) {}
}

@CommandHandler(UpdatePayrollCommand)
export class UpdatePayrollHandler implements ICommandHandler<UpdatePayrollCommand> {
  constructor(
    @InjectRepository(Payroll)
    private readonly payrollRepository: Repository<Payroll>,
  ) {}

  async execute(command: UpdatePayrollCommand): Promise<Payroll> {
    await this.payrollRepository.update(command.id, command.updatePayrollDto as any);
    const updatedPayroll = await this.payrollRepository.findOneBy({ PayrollID: command.id });
    if (!updatedPayroll) {
      throw new Error(
        `Payroll with ID ${command.id} not found after update.`,
      );
    }
    return updatedPayroll;
  }
}

// Delete Command and Handler
export class DeletePayrollCommand {
  constructor(public readonly id: number) {}
}

@CommandHandler(DeletePayrollCommand)
export class DeletePayrollHandler implements ICommandHandler<DeletePayrollCommand> {
  constructor(
    @InjectRepository(Payroll)
    private readonly payrollRepository: Repository<Payroll>,
  ) {}

  async execute(command: DeletePayrollCommand): Promise<void> {
    await this.payrollRepository.delete(command.id);
  }
}
