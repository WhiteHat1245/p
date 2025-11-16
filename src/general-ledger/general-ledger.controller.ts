
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
import { CreateGeneralLedgerDto } from './dto/create-general-ledger.dto';
import { UpdateGeneralLedgerDto } from './dto/update-general-ledger.dto';
import { CreateGeneralLedgerCommand } from './commands/impl/create-general-ledger.command';
import { GetGeneralLedgersQuery } from './queries/impl/get-general-ledgers.query';
import { GetGeneralLedgerQuery } from './queries/impl/get-general-ledger.query';
import { UpdateGeneralLedgerCommand } from './commands/impl/update-general-ledger.command';
import { RemoveGeneralLedgerCommand } from './commands/impl/remove-general-ledger.command';

@Controller('general-ledger')
export class GeneralLedgerController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() createGeneralLedgerDto: CreateGeneralLedgerDto) {
    return this.commandBus.execute(
      new CreateGeneralLedgerCommand(createGeneralLedgerDto),
    );
  }

  @Get()
  findAll() {
    return this.queryBus.execute(new GetGeneralLedgersQuery());
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.queryBus.execute(new GetGeneralLedgerQuery(id));
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGeneralLedgerDto: UpdateGeneralLedgerDto,
  ) {
    return this.commandBus.execute(
      new UpdateGeneralLedgerCommand(id, updateGeneralLedgerDto),
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.commandBus.execute(new RemoveGeneralLedgerCommand(id));
  }
}
