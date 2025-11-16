import { ICommand } from "@nestjs/cqrs";

export class RemoveMedicationCommand implements ICommand {
  constructor(public readonly id: number) {}
}
