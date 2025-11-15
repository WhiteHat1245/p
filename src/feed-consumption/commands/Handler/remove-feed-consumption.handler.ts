import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { RemoveFeedConsumptionCommand } from '../remove-feed-consumption.command';
import { FeedConsumption } from 'src/Core Models/FeedConsumption';

/**
 * مستلم أمر حذف سجل استهلاك علف موجود.
 * مسؤول عن حذف سجل استهلاك العلف من قاعدة البيانات بناءً على المعرف.
 */
@CommandHandler(RemoveFeedConsumptionCommand)
export class RemoveFeedConsumptionHandler implements ICommandHandler<RemoveFeedConsumptionCommand> {
  constructor(
    @InjectRepository(FeedConsumption)
    private readonly feedConsumptionRepository: Repository<FeedConsumption>,
  ) {}

  /**
   * ينفذ أمر حذف سجل استهلاك العلف.
   * @param command أمر RemoveFeedConsumptionCommand
   * @returns وعد لا يُرجع شيئًا (void) عند اكتمال الحذف
   */
  async execute(command: RemoveFeedConsumptionCommand): Promise<void> {
    const { id } = command;
    // تنفيذ عملية الحذف في قاعدة البيانات
    const result = await this.feedConsumptionRepository.delete(id);

    // التحقق مما إذا كان قد تم حذف أي سجل (لم يتم العثور عليه)
    if (result.affected === 0) {
      throw new NotFoundException(`Feed Consumption record with ID ${id} not found`);
    }
  }
}
