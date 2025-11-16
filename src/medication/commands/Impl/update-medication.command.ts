import { UpdateMedicationDto } from '../../dto/update-medication.dto';

export class UpdateMedicationCommand {
  constructor(
    public readonly id: string,
    public readonly updateMedicationDto: UpdateMedicationDto,
  ) {}
}
