import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { SupplierController } from './supplier.controller';

// استيراد مستلمات الأوامر
import { CreateSupplierHandler } from './commands/handlers/create-supplier.handler';
import { UpdateSupplierHandler } from './commands/handlers/update-supplier.handler';
import { RemoveSupplierHandler } from './commands/handlers/remove-supplier.handler';

// استيراد مستلمات الاستعلامات
import { GetSupplierHandler } from './queries/handlers/get-supplier.handler';
import { GetSuppliersHandler } from './queries/handlers/get-suppliers.handler';
import { Supplier } from 'src/Core Models/Supplier';

const CommandHandlers = [
  CreateSupplierHandler,
  UpdateSupplierHandler,
  RemoveSupplierHandler,
];
const QueryHandlers = [GetSupplierHandler, GetSuppliersHandler];

@Module({
  imports: [TypeOrmModule.forFeature([Supplier]), CqrsModule],
  controllers: [SupplierController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class SupplierModule {}
