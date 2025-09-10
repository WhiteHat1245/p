import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { RemoveDebtCommand } from '../impl/RemoveDebtCommand';
import { Debt } from 'src/Core Models/Debt';

@CommandHandler(RemoveDebtCommand)
export class RemoveDebtHandler implements ICommandHandler<RemoveDebtCommand> {
  constructor(
    @InjectRepository(Debt)
    private readonly debtRepository: Repository<Debt>,
  ) {}

  async execute(command: RemoveDebtCommand): Promise<void> {
    const { id } = command;
    const result = await this.debtRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Debt with ID ${id} not found`);
    }
  }
}
