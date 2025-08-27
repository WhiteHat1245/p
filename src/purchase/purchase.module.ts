import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { PurchaseController } from './purchase.controller';

// استيراد مستلمات الأوامر
import { CreatePurchaseHandler } from './commands/handlers/create-purchase.handler';
import { UpdatePurchaseHandler } from './commands/handlers/update-purchase.handler';
import { RemovePurchaseHandler } from './commands/handlers/remove-purchase.handler';

// استيراد مستلمات الاستعلامات
import { GetPurchaseHandler } from './queries/handlers/get-purchase.handler';
import { GetPurchasesHandler } from './queries/handlers/get-purchases.handler';
import { Purchase } from 'src/Core Models/Purchase ';
import { FrozenPoultryInventory } from 'src/Core Models/FrozenPoultryInventory';
import { PurchaseDetail } from 'src/Core Models/purchase-detail';

const CommandHandlers = [CreatePurchaseHandler, UpdatePurchaseHandler, RemovePurchaseHandler];
const QueryHandlers = [GetPurchaseHandler, GetPurchasesHandler];

@Module({
  imports: [TypeOrmModule.forFeature([Purchase, PurchaseDetail, FrozenPoultryInventory]), CqrsModule],
  controllers: [PurchaseController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class PurchaseModule {}