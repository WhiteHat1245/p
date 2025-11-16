
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from './payment.controller';
import { PaymentCommandHandlers } from './commands';
import { PaymentQueryHandlers } from './queries';
import { Payment } from 'src/Core Models/Payment';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Payment]),
  ],
  controllers: [PaymentController],
  providers: [
    ...PaymentCommandHandlers,
    ...PaymentQueryHandlers,
  ],
})
export class PaymentModule {}
