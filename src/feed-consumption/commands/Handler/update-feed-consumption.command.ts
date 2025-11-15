import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateFeedConsumptionCommand } from '../update-feed-consumption.command';
import { FeedConsumption } from 'src/Core Models/FeedConsumption';

/**
 * مستلم أمر تحديث سجل استهلاك العلف.
 * مسؤول عن التحقق من وجود السجل ثم تطبيق التحديثات.
 */
@CommandHandler(UpdateFeedConsumptionCommand)
export class UpdateFeedConsumptionHandler implements ICommandHandler<UpdateFeedConsumptionCommand> {
  constructor(
    @InjectRepository(FeedConsumption)
    private readonly feedConsumptionRepository: Repository<FeedConsumption>,
  ) {}

  /**
   * ينفذ عملية التحديث.
   * @param command أمر UpdateFeedConsumptionCommand
   * @returns وعد بسجل FeedConsumption المحدث
   */
  async execute(command: UpdateFeedConsumptionCommand): Promise<FeedConsumption> {
    const { id, updateFeedConsumptionDto } = command;

    // استخدام preload لإنشاء نسخة من الكيان مع البيانات الجديدة، مع الحفاظ على المعرف
    const consumption = await this.feedConsumptionRepository.preload({
      FeedConsumptionID: id,
      ...updateFeedConsumptionDto,
    });

    // التحقق مما إذا كان السجل موجودًا
    if (!consumption) {
      throw new NotFoundException(`FeedConsumption record with ID ${id} not found`);
    }

    // حفظ الكيان المحدث
    return this.feedConsumptionRepository.save(consumption);
  }
}
