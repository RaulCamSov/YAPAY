import { MyOrders } from "./my-orders";
import { Product } from "./product";

export class DetailsOrder {
    idDetailsOrder: number=0;
    amount: number=0;
    Subtotal: number=0;
    products: Product;
    order:MyOrders;
}
