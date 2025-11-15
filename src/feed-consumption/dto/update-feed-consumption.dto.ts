import { PartialType } from '@nestjs/mapped-types';
import { CreateFeedConsumptionDto } from './create-feed-consumption.dto';
import { IsNumber, IsOptional, IsDateString, IsString } from 'class-validator';

/**
 * كائن نقل البيانات (DTO) لتحديث سجل استهلاك علف موجود.
 * يستخدم PartialType لجعل جميع حقول CreateFeedConsumptionDto اختيارية (لأن التحديث قد يشمل جزءًا فقط من الحقول).
 */
export class UpdateFeedConsumptionDto extends PartialType(CreateFeedConsumptionDto) {
  // يمكن إضافة أي حقول خاصة بعملية التحديث هنا إذا لزم الأمر، 
  // ولكن استخدام PartialType يكفي لتغطية جميع حقول الإنشاء كاختيارية.
  
  /**
   * ملاحظة: حقول مثل consumptionDate, quantityConsumed, feedId, coopId, و notes
   * جميعها متاحة للتحديث ولكنها اختيارية بفضل PartialType.
   */
}
