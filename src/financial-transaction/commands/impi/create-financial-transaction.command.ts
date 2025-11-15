import { CreateFinancialTransactionDto } from "src/financial-transaction/dto/CreateFinancialTransactionDto";

export class CreateFinancialTransactionCommand {
  constructor(public readonly createFinancialTransactionDto: CreateFinancialTransactionDto) {}
}
