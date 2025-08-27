import { IsNumber, IsNotEmpty } from 'class-validator';
import { Purchase } from 'src/Core Models/Purchase ';


export class PurchaseDetailDto {
  @IsNumber()
  @IsNotEmpty()
  itemID: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  unitCost: number;
    Purchase: Purchase;
}