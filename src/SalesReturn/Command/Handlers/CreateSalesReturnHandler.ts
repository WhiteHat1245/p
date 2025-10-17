import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSalesReturnCommand } from '../Impl/createSalesReturnDto';
import { SalesReturn } from 'src/Core Models/SalesReturn';
import { SalesReturnDetail } from 'src/Core Models/SalesReturnDetail';
@CommandHandler(CreateSalesReturnCommand)
export class CreateSalesReturnHandler
  implements ICommandHandler<CreateSalesReturnCommand>
{
  constructor(
    @InjectRepository(SalesReturn)
    private readonly salesReturnRepository: Repository<SalesReturn>,
    @InjectRepository(SalesReturnDetail)
    private readonly salesReturnDetailRepository: Repository<SalesReturnDetail>,
  ) {}

  async execute(command: CreateSalesReturnCommand): Promise<SalesReturn> {
    const { createSalesReturnDto } = command;
    const { Details, ...returnData } = createSalesReturnDto;

    // 1. إنشاء كيان الإرجاع الرئيسي
    const salesReturn = this.salesReturnRepository.create(returnData);
    const savedReturn = await this.salesReturnRepository.save(salesReturn);

    // 2. إنشاء تفاصيل الإرجاع وحفظها
    const returnDetails = Details.map((detailDto) => {
      return this.salesReturnDetailRepository.create({
        ...detailDto,
        SalesReturnID: savedReturn.ReturnID, // ربط التفاصيل بالمعرف الرئيسي
      });
    });

    await this.salesReturnDetailRepository.save(returnDetails);

    // 3. جلب الكيان الرئيسي مع التفاصيل للعرض
    return (await this.salesReturnRepository.findOne({
      where: { ReturnID: savedReturn.ReturnID },
      relations: ['SalesReturnDetails'],
    }))!;
  }
}
