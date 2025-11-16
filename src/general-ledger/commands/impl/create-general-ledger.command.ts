
import { CreateGeneralLedgerDto } from '../../dto/create-general-ledger.dto';

export class CreateGeneralLedgerCommand {
  constructor(public readonly createGeneralLedgerDto: CreateGeneralLedgerDto) {}
}
