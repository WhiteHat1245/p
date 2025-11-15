import { UpdateFeedConsumptionDto } from "../dto/update-feed-consumption.dto";

/**
 * أمر تحديث سجل استهلاك علف موجود.
 * يحمل معرف السجل وبيانات DTO للتحديث.
 */
export class UpdateFeedConsumptionCommand {
  constructor(public readonly id: number, public readonly updateFeedConsumptionDto: UpdateFeedConsumptionDto) {}
}
