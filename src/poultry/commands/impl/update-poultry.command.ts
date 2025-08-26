import { ICommand } from '@nestjs/cqrs';

export class UpdatePoultryCommand implements ICommand {
  constructor(
    public readonly id: number,
    public readonly updatePoultryDto: any
  ) {}
}
