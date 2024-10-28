import { Customer } from "./customer";
import { DetailsOrder } from "./details-order";
import { PaymentType } from "./payment-type";

export class MyOrders {
    id: number=0;
    customer: Customer;
    paymentType: PaymentType;
    orderDate: Date;
    detailsOrders: DetailsOrder;
    
}
