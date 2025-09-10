import { PartialType } from '@nestjs/mapped-types';
import { CreateDebtDto } from './CreateDebtDto';

export class UpdateDebtDto extends PartialType(CreateDebtDto) {}
