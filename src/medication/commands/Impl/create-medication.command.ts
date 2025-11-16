import { CreateMedicationDto } from '../../dto/create-medication.dto';

export class CreateMedicationCommand {
  constructor(public readonly createMedicationDto: CreateMedicationDto) {}
}
