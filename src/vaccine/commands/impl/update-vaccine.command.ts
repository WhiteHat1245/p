import { UpdateVaccineDto } from 'src/vaccine/dto/update-vaccine.dto.ts/update-vaccine.dto.ts';

export class UpdateVaccineCommand {
  constructor(
    public readonly id: number,
    public readonly updateVaccineDto: UpdateVaccineDto,
  ) {}
}
