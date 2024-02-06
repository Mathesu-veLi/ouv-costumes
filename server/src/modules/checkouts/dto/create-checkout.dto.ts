interface ILineItem {
  price: string;
  quantity: number;
}

export class CreateCheckoutDto {
  lineItems: ILineItem[];
}
