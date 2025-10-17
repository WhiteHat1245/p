import { PartialType } from '@nestjs/mapped-types';
import { CreateSalesReturnDetailDto } from './CreateSalesReturnDetailDto';

export class UpdateSalesReturnDetailDto extends PartialType(
  CreateSalesReturnDetailDto,
) {}
