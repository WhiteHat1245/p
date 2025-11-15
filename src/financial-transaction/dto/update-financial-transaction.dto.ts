import { PartialType } from '@nestjs/mapped-types';
import { CreateFinancialTransactionDto } from './CreateFinancialTransactionDto';

/**
 * يستخدم PartialType لجعل جميع حقول CreateFinancialTransactionDto اختيارية تلقائيًا.
 */
export class UpdateFinancialTransactionDto extends PartialType(CreateFinancialTransactionDto) {}