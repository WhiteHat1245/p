import { UpdateDebtDto } from 'src/Debt/dto/UpdateDebtDto';

export class UpdateDebtCommand {
  constructor(
    public readonly id: number,
    public readonly updateDebtDto: UpdateDebtDto,
  ) {}
}
