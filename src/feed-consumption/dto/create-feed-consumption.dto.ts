import { IsDateString, IsNumber, IsNotEmpty, IsString, IsOptional } from 'class-validator';

/**
 * كائن نقل البيانات (DTO) لإنشاء سجل استهلاك علف جديد.
 * يتحقق من صحة المدخلات قبل معالجة الأمر.
 */
export class CreateFeedConsumptionDto {
  /**
   * تاريخ تسجيل الاستهلاك. يجب أن يكون تاريخًا صحيحًا.
   */
  @IsDateString()
  @IsNotEmpty()
  consumptionDate: string;

  /**
   * كمية العلف المستهلكة (بالكيلوغرام أو الوحدة المعتمدة).
   */
  @IsNumber()
  @IsNotEmpty()
  quantityConsumed: number;

  /**
   * معرف العلف المستخدم (يرتبط بكيان Feed).
   */
  @IsNumber()
  @IsNotEmpty()
  feedId: number;

  /**
   * معرف الحظيرة التي حدث فيها الاستهلاك (يرتبط بكيان Coop).
   */
  @IsNumber()
  @IsOptional() // يمكن أن يكون اختياريًا إذا كان الاستهلاك على مستوى المزرعة
  coopId?: number;

  /**
   * ملاحظات إضافية حول الاستهلاك.
   */
  @IsString()
  @IsOptional()
  notes?: string;
}
