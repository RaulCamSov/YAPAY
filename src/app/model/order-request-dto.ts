import { OrderProductDTO } from "./order-product-dto";

export class OrderRequestDTO {
    customerId: number=0;
    paymentTypeId: number=0;
    products: OrderProductDTO[];
}
