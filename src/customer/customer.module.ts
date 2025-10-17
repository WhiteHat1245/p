import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { CustomerController } from './customer.controller';

// استيراد مستلمات الأوامر
import { CreateCustomerHandler } from './commands/handlers/create-customer.handler';
import { UpdateCustomerHandler } from './commands/handlers/update-customer.handler';
import { RemoveCustomerHandler } from './commands/handlers/remove-customer.handler';

// استيراد مستلمات الاستعلامات
import { GetCustomerHandler } from './queries/handlers/get-customer.handler';
import { GetCustomersHandler } from './queries/handlers/get-customers.handler';
import { Customer } from 'src/Core Models/Customer';

const CommandHandlers = [
  CreateCustomerHandler,
  UpdateCustomerHandler,
  RemoveCustomerHandler,
];
const QueryHandlers = [GetCustomerHandler, GetCustomersHandler];

@Module({
  imports: [TypeOrmModule.forFeature([Customer]), CqrsModule],
  controllers: [CustomerController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class CustomerModule {}
