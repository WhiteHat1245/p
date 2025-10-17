import { CreateVaccineDto } from 'src/vaccine/dto/create-vaccine.dto.ts/create-vaccine.dto.ts';

export class CreateVaccineCommand {
  constructor(public readonly createVaccineDto: CreateVaccineDto) {}
}
