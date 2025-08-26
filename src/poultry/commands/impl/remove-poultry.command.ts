import { ICommand } from '@nestjs/cqrs';

export class RemovePoultryCommand implements ICommand {
  constructor(public readonly id: number) {}
}
