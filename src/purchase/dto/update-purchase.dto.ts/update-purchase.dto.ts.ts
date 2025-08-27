import { PartialType } from '@nestjs/mapped-types';
import { CreatePurchaseDto } from '../create-purchase.dto.ts/create-purchase.dto.ts';

export class UpdatePurchaseDto extends PartialType(CreatePurchaseDto) {}