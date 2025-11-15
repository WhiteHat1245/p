import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { GetFeedConsumptionQuery } from '../get-feed-consumption.query';
import { FeedConsumption } from 'src/Core Models/FeedConsumption';

/**
 * مستلم استعلام جلب سجل استهلاك علف واحد.
 * يقوم بالبحث عن سجل استهلاك العلف في قاعدة البيانات بواسطة المعرف (ID).
 */
@QueryHandler(GetFeedConsumptionQuery)
export class GetFeedConsumptionHandler implements IQueryHandler<GetFeedConsumptionQuery> {
  constructor(
    @InjectRepository(FeedConsumption)
    private readonly feedConsumptionRepository: Repository<FeedConsumption>,
  ) {}

  /**
   * ينفذ استعلام جلب سجل استهلاك العلف.
   * @param query استعلام GetFeedConsumptionQuery
   * @returns وعد بسجل استهلاك العلف المطابق
   */
  async execute(query: GetFeedConsumptionQuery): Promise<FeedConsumption> {
    const { id } = query;

    // جلب سجل استهلاك العلف بواسطة المعرف، مع تحميل العلاقات (Coop و Feed)
    const feedConsumption = await this.feedConsumptionRepository.findOne({
      where: { FeedConsumptionID: id },
      relations: ['Coop', 'Feed'],
    });

    if (!feedConsumption) {
      throw new NotFoundException(`Feed Consumption record with ID ${id} not found`);
    }

    return feedConsumption;
  }
}
