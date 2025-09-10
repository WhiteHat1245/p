import { CreateDebtDto } from "src/Debt/dto/CreateDebtDto";

export class CreateDebtCommand{
    constructor(public readonly createDebtDto:CreateDebtDto){}
}