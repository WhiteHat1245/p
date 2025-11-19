
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayrollController } from './payroll.controller';
import { PayrollCommandHandlers } from './commands';
import { PayrollQueryHandlers } from './queries';
import { Payroll } from '../Core Models/Payroll';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Payroll]),
  ],
  controllers: [PayrollController],
  providers: [
    ...PayrollCommandHandlers,
    ...PayrollQueryHandlers,
  ],
})
export class PayrollModule {}
