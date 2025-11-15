import { IQuery } from '@nestjs/cqrs';

/**
 * استعلام لجلب سجل استهلاك علف واحد بواسطة المعرف (ID).
 * يستخدم في متحكم FeedConsumptionController لجلب سجل محدد.
 */
export class GetFeedConsumptionQuery implements IQuery {
  constructor(public readonly id: number) {}
}
