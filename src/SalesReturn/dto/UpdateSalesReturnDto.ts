import { PartialType } from '@nestjs/mapped-types';
import { CreateSalesReturnDto } from './CreateSalesReturnDto';

export class UpdateSalesReturnDto extends PartialType(CreateSalesReturnDto) {
  // لا نحتاج لتضمين التفاصيل هنا عادة لأن تحديث التفاصيل يتم عبر مسارات فرعية
}
