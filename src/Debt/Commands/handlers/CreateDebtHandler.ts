import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDebtCommand } from '../impl/CreateDebtCommand';
import { Debt } from 'src/Core Models/Debt';
import { GetTotalDebtQuery } from 'src/Debt/queries/impl/get-total-debt.query';
import { BadRequestException } from '@nestjs/common';
import { CreateDebtDto } from 'src/Debt/dto/CreateDebtDto';

const DEBT_LIMIT = 100000;

@CommandHandler(CreateDebtCommand)
export class CreateDebtHandler implements ICommandHandler<CreateDebtCommand> {
  constructor(
    @InjectRepository(Debt)
    private readonly debtRepository: Repository<Debt>,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(command: CreateDebtCommand): Promise<Debt> {
    const { createDebtDto } = command;

    const currentTotalDebt = await this.queryBus.execute(
      new GetTotalDebtQuery(createDebtDto.customerId),
    );
    const newTotalDebt = currentTotalDebt + createDebtDto.amount;

    if (newTotalDebt > DEBT_LIMIT) {
      throw new BadRequestException(
        `Creating this debt would exceed the customer's limit of ${DEBT_LIMIT}. Current debt: ${currentTotalDebt}`,
      );
    }

    const debt = this.debtRepository.create(createDebtDto);
    return this.debtRepository.save(debt);
  }
}
