import { UpdateFinancialTransactionDto } from "src/financial-transaction/dto/update-financial-transaction.dto";

export class UpdateFinancialTransactionCommand {
  constructor(
    public readonly id: string,
    public readonly updateFinancialTransactionDto: UpdateFinancialTransactionDto,
  ) {}
}
