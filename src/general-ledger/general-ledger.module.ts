import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GeneralLedgerController } from './general-ledger.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneralLedger } from '../Core Models/GeneralLedger';
import { CommandHandlers } from 'src/chart-of-accounts/chart-of-accounts.module';
import { QueryHandlers } from 'src/financial-transaction/financial-transaction.module';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([GeneralLedger])
  ],
  controllers: [GeneralLedgerController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class GeneralLedgerModule {}
