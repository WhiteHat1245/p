import { IQuery } from '@nestjs/cqrs';

/**
 * استعلام لجلب قائمة بجميع سجلات استهلاك العلف.
 * يستخدم في متحكم FeedConsumptionController لجلب جميع السجلات.
 */
export class GetFeedConsumptionsListQuery implements IQuery {
  constructor() {}
}
