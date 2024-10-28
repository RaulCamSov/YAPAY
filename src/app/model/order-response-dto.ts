import { OrderProductDTO } from "./order-product-dto";

export class OrderResponseDTO {
    orderId: number=0;
  totalAmount: number=0;
  detailsOrders: OrderProductDTO[] = []; // Añadir esta línea
}
