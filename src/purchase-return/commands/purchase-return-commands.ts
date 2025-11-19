import { CommandHandler, ICommandHandler, ICommand } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CreatePurchaseReturnDto } from '../dto/create-purchase-return.dto';
import { PartialType } from '@nestjs/mapped-types';
import { PurchaseReturn } from 'src/Core Models/PurchaseReturn';

// DTOs
export class UpdatePurchaseReturnDto extends PartialType(CreatePurchaseReturnDto) {}

// --- Commands ---
export class CreatePurchaseReturnCommand implements ICommand {
  constructor(public readonly dto: CreatePurchaseReturnDto) {}
}

// --- Handlers ---
@CommandHandler(CreatePurchaseReturnCommand)
export class CreatePurchaseReturnHandler implements ICommandHandler<CreatePurchaseReturnCommand> {
  constructor(
    @InjectRepository(PurchaseReturn) private readonly repository: Repository<PurchaseReturn>,
    private readonly dataSource: DataSource,
  ) {}

  async execute(command: CreatePurchaseReturnCommand): Promise<PurchaseReturn> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newReturn = this.repository.create(command.dto);
      const savedReturn = await queryRunner.manager.save(newReturn);

      // هنا يجب إضافة منطق لتحديث المخزون وقيود الموردين/الدفتر العام

      await queryRunner.commitTransaction();
      return savedReturn;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
// (تم حذف معالجات التحديث والحذف لتجنب التعقيد اللوجستي المرتبط بالمخزون)