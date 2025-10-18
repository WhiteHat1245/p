import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateEquipmentCommand } from '../impl/update-equipment.command';
import { NotFoundException } from '@nestjs/common';
import { Equipment } from 'src/Core Models/Equipment';

/**
 * معالج الأمر لتحديث سجل المعدات.
 * ينفذ عملية البحث عن المعدة وتحديث حقولها بالبيانات الجديدة.
 */
@CommandHandler(UpdateEquipmentCommand)
export class UpdateEquipmentHandler implements ICommandHandler<UpdateEquipmentCommand> {
  constructor(
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,
  ) {}

  /**
   * ينفذ أمر تحديث المعدات.
   * @param command أمر التحديث الذي يحتوي على ID المعدة والبيانات المراد تحديثها.
   * @returns المعدة المحدثة.
   */
  async execute(command: UpdateEquipmentCommand): Promise<Equipment> {
    const { equipmentId, updateEquipmentDto } = command;

    // 1. البحث عن المعدة بواسطة ID
    const equipment = await this.equipmentRepository.findOne({ where: { EquipmentID: equipmentId } });

    if (!equipment) {
      throw new NotFoundException(`Equipment with ID ${equipmentId} not found.`);
    }

    // 2. تطبيق التحديثات على الكيان
    // استخدام Object.assign لدمج الحقول الحالية مع الحقول الجديدة في DTO
    Object.assign(equipment, updateEquipmentDto);

    // 3. حفظ الكيان المحدث في قاعدة البيانات
    return this.equipmentRepository.save(equipment);
  }
}
