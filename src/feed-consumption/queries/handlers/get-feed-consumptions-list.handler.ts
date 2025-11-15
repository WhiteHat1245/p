import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetFeedConsumptionsListQuery } from '../get-feed-consumptions-list.query';
import { FeedConsumption } from 'src/Core Models/FeedConsumption';

/**
 * معالج الاستعلام لجلب قائمة بجميع سجلات استهلاك العلف.
 */
@QueryHandler(GetFeedConsumptionsListQuery)
export class GetFeedConsumptionsListHandler implements IQueryHandler<GetFeedConsumptionsListQuery> {
  constructor(
    @InjectRepository(FeedConsumption)
    private readonly feedConsumptionRepository: Repository<FeedConsumption>,
  ) {}

  /**
   * ينفذ الاستعلام ويعيد قائمة بجميع سجلات استهلاك العلف.
   * @returns قائمة بكيانات FeedConsumption.
   */
  async execute(query: GetFeedConsumptionsListQuery): Promise<FeedConsumption[]> {
    // جلب جميع سجلات استهلاك العلف.
    // يتم تضمين العلاقة مع 'Coop' و 'Feed' لجلب البيانات المرتبطة.
    return this.feedConsumptionRepository.find({
      relations: ['Coop', 'Feed'],
    });
  }
}
