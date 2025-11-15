import { ICommand } from '@nestjs/cqrs';

/**
 * أمر حذف سجل استهلاك علف.
 * يحمل معرف السجل المراد حذفه.
 */
export class RemoveFeedConsumptionCommand implements ICommand {
  constructor(public readonly id: number) {}
}
