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
import { CreateBreedCommand } from './commands/impl/create-breed.command';
import { UpdateBreedCommand } from './commands/impl/update-breed.command';
import { RemoveBreedCommand } from './commands/impl/remove-breed.command';
import { GetBreedQuery } from './queries/impl/get-breed.query';
import { GetBreedsQuery } from './queries/impl/get-breeds.query';
import { CreateBreedDto } from './dto/create-breed.dto.ts/create-breed.dto.ts';
import { Breed } from 'src/Core Models/Breed';
import { UpdateBreedDto } from './dto/update-breed.dto.ts/update-breed.dto.ts';

@Controller('breed')
export class BreedController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() dto: CreateBreedDto): Promise<Breed> {
    return this.commandBus.execute(new CreateBreedCommand(dto));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Breed> {
    return this.queryBus.execute(new GetBreedQuery(id));
  }

  @Get()
  findAll(): Promise<Breed[]> {
    return this.queryBus.execute(new GetBreedsQuery());
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBreedDto,
  ): Promise<Breed> {
    return this.commandBus.execute(new UpdateBreedCommand(id, dto));
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.commandBus.execute(new RemoveBreedCommand(id));
  }
}
