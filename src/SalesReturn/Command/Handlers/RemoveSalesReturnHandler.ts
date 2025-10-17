import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { RemoveSalesReturnCommand } from '../Impl/RemoveSalesReturnCommand';
import { SalesReturn } from 'src/Core Models/SalesReturn';

@CommandHandler(RemoveSalesReturnCommand)
export class RemoveSalesReturnHandler
  implements ICommandHandler<RemoveSalesReturnCommand>
{
  constructor(
    @InjectRepository(SalesReturn)
    private readonly salesReturnRepository: Repository<SalesReturn>,
  ) {}

  async execute(command: RemoveSalesReturnCommand): Promise<void> {
    const { id } = command;
    // TypeORM سيهتم بحذف SalesReturnDetails المرتبطة (Cascading Delete) إذا تم إعدادها
    const result = await this.salesReturnRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Sales Return with ID ${id} not found`);
    }
  }
}
