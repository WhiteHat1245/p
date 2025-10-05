import { CreateSalesReturnDto } from "src/SalesReturn/dto/CreateSalesReturnDto";

export class CreateSalesReturnCommand {
  constructor(public readonly createSalesReturnDto: CreateSalesReturnDto) {}
}
