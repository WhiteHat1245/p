
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethodController } from './payment-method.controller';
import { PaymentMethodCommandHandlers } from './commands';
import { PaymentMethodQueryHandlers } from './queries';
import { PaymentMethod } from 'src/Core Models/PaymentMethod';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([PaymentMethod]),
  ],
  controllers: [PaymentMethodController],
  providers: [
    ...PaymentMethodCommandHandlers,
    ...PaymentMethodQueryHandlers,
  ],
})
export class PaymentMethodModule {}
