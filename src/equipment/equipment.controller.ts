import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

// استيراد الأوامر والاستعلامات
import { GetEquipmentQuery } from './queries/impl/get-equipment.query';
import { GetEquipmentsQuery } from './queries/impl/get-equipments.query';
import { CreateEquipmentCommand } from './commands/impl/create-equipment.command';
import { UpdateEquipmentCommand } from './commands/impl/update-equipment.command';
import { RemoveEquipmentCommand } from './commands/impl/remove-equipment.command';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { Equipment } from 'src/Core Models/Equipment';

@Controller('equipment')
export class EquipmentController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() createEquipmentDto: CreateEquipmentDto): Promise<Equipment> {
    return this.commandBus.execute(
      new CreateEquipmentCommand(createEquipmentDto),
    );
  }

  @Get()
  findAll(): Promise<Equipment[]> {
    return this.queryBus.execute(new GetEquipmentsQuery());
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Equipment> {
    return this.queryBus.execute(new GetEquipmentQuery(id));
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEquipmentDto: UpdateEquipmentDto,
  ): Promise<Equipment> {
    return this.commandBus.execute(
      new UpdateEquipmentCommand(id, updateEquipmentDto),
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.commandBus.execute(new RemoveEquipmentCommand(id));
  }
}
