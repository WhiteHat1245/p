import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { MedicationController } from './medication.controller';
import { Medication } from 'src/Core Models/Medication';
import { TreatmentSchedule } from 'src/Core Models/TreatmentSchedule';
import { VaccinationSchedule } from 'src/Core Models/VaccinationSchedule';
import { CreateMedicationHandler } from './commands/handler/create-medication-handler';
import { UpdateMedicationHandler } from './commands/handler/update-medication-handler';
import { RemoveMedicationHandler } from './commands/handler/remove-medication-handler';

const CommandHandlers = [
  CreateMedicationHandler,
  UpdateMedicationHandler,
  RemoveMedicationHandler,
];
const QueryHandlers = [
  CreateMedicationHandler,
  CreateMedicationHandler,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([Medication, TreatmentSchedule, VaccinationSchedule]),
    CqrsModule,
  ],
  controllers: [MedicationController],
  providers: [
    ...CommandHandlers, 
    ...QueryHandlers,
  ],
})
export class MedicationModule {}