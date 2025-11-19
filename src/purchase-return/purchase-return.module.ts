import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseReturn } from 'src/Core Models/PurchaseReturn';
import { PurchaseReturnController } from './purchase-return.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseReturn])],
  controllers: [PurchaseReturnController],
  providers: [],
})
export class PurchaseReturnModule {}
