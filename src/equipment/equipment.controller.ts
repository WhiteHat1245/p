import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

// استيراد الأوامر والاستعلامات
import { GetEquipmentQuery } from './queries/impl/get-equipment.query';
import { GetEquipmentsQuery } from './queries/impl/get-equipments.query';
import { Equipment } from 'src/Core Models/Equipment';

@Controller('equipment')
export class EquipmentController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Equipment> {
    return this.queryBus.execute(new GetEquipmentQuery(id));
  }

  @Get()
  findAll(): Promise<Equipment[]> {
    return this.queryBus.execute(new GetEquipmentsQuery());
  }
}
