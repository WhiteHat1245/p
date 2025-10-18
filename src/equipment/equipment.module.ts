import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { EquipmentController } from './equipment.controller';

// استيراد مستلمات الاستعلامات
import { GetEquipmentHandler } from './queries/handlers/get-equipment.handler';
import { GetEquipmentsHandler } from './queries/handlers/get-equipments.handler';
import { Equipment } from 'src/Core Models/Equipment';
import { MaintenanceSchedule } from 'src/Core Models/MaintenanceSchedule';

const QueryHandlers = [GetEquipmentHandler, GetEquipmentsHandler];

@Module({
  imports: [
    TypeOrmModule.forFeature([Equipment, MaintenanceSchedule]),
    CqrsModule,
  ],
  controllers: [EquipmentController],
  providers: [...QueryHandlers],
})
export class EquipmentModule {}
