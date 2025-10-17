import { PartialType } from '@nestjs/mapped-types';
import { CreateVaccineDto } from '../create-vaccine.dto.ts/create-vaccine.dto.ts';

export class UpdateVaccineDto extends PartialType(CreateVaccineDto) {}
