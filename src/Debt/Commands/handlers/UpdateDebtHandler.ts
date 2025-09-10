import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Debt } from 'src/Core Models/Debt';
import { UpdateDebtCommand } from '../impl/UpdateDebtCommand';
import { GetTotalDebtQuery } from 'src/Debt/queries/impl/get-total-debt.query';
const DEBT_LIMIT =100000
@CommandHandler(UpdateDebtCommand)
export class UpdateDebtHandler implements ICommandHandler<UpdateDebtCommand> {
  constructor(
    @InjectRepository(Debt)
    private readonly debtRepository: Repository<Debt>,
     private readonly queryBus: QueryBus,
  ) {}

async execute(command: UpdateDebtCommand): Promise<Debt> {
    const { id, updateDebtDto } = command;
    const debt = await this.debtRepository.findOne({ where: { DebtID: id } });

    if (!debt) {
      throw new NotFoundException(`Debt with ID ${id} not found`);
    }

    const newAmount = updateDebtDto.amount || debt.Amount;
    const currentTotalDebt = await this.queryBus.execute(new GetTotalDebtQuery(debt.CustomerID));
    const newTotalDebt = (currentTotalDebt - debt.Amount) + newAmount;

    if (newTotalDebt > DEBT_LIMIT) {
      throw new BadRequestException(`Updating this debt would exceed the customer's limit of ${DEBT_LIMIT}. Current debt: ${currentTotalDebt - debt.Amount}`);
    }

    // Update the debt entity with the new values
    Object.assign(debt, updateDebtDto);

    // Save the updated debt entity
    return this.debtRepository.save(debt);
  }
    
}
