import { Module } from '@nestjs/common';
import { DebtController } from './debt.controller';
import { CreateDebtHandler } from './Commands/handlers/CreateDebtHandler';
import { GetDebtsHandler } from './queries/handlers/GetDebtsHandler';
import { GetDebtHandler } from './queries/handlers/GetDebtHandler';
import { UpdateDebtHandler } from './Commands/handlers/UpdateDebtHandler';
import { GetTotalDebtHandler } from './queries/handlers/get-total-debt.handler';
import { RemoveDebtHandler } from './Commands/handlers/RemoveDebtHandler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Debt } from 'src/Core Models/Debt';
import { Customer } from 'src/Core Models/Customer';
import { CqrsModule } from '@nestjs/cqrs';

const CommandHandlers = [
  CreateDebtHandler,
  UpdateDebtHandler,
  RemoveDebtHandler,
];
const QueryHandlers = [GetDebtHandler, GetDebtsHandler, GetTotalDebtHandler];

@Module({
  imports: [TypeOrmModule.forFeature([Debt, Customer]), CqrsModule],
  controllers: [DebtController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class DebtModule {}
