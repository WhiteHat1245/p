import { CreateFeedConsumptionDto } from '../dto/create-feed-consumption.dto';

/**
 * أمر إنشاء سجل استهلاك علف جديد.
 * يحمل بيانات DTO التي تم التحقق من صحتها من المتحكم إلى المستلم (Handler).
 */
export class CreateFeedConsumptionCommand {
  constructor(public readonly createFeedConsumptionDto: CreateFeedConsumptionDto) {}
}
