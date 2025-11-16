
import { UpdateGeneralLedgerDto } from '../../dto/update-general-ledger.dto';

export class UpdateGeneralLedgerCommand {
  constructor(
    public readonly ledgerId: number,
    public readonly updateGeneralLedgerDto: UpdateGeneralLedgerDto,
  ) {}
}
