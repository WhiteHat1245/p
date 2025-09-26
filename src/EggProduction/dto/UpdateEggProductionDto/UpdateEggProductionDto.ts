import { PartialType } from '@nestjs/mapped-types';
import { CreateEggProductionDto } from '../CreateEggProductionDto/CreateEggProductionDto';

export class UpdateEggProductionDto extends PartialType(CreateEggProductionDto) {}
