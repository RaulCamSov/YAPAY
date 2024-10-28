import { Component, OnInit } from '@angular/core';
import { OrderProductDTO } from '../../../model/order-product-dto';
import { OrderService } from '../../../service/order.service';
import { Router } from '@angular/router';
import { OrderRequestDTO } from '../../../model/order-request-dto';
import { LoginService } from '../../../service/login.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit {
  products: OrderProductDTO[] = [];
  customerId: number | null = null;
  paymentTypeId: number | null = null; // Updated to nullable type

  constructor(
    private orderService: OrderService, 
    private router: Router,
    private loginService: LoginService // Inyecta el servicio de login
  ) { }

  ngOnInit(): void {
    this.customerId = this.loginService.getCustomerId();
    this.paymentTypeId = this.loginService.getPaymentTypeId();
    
    if (this.customerId === null) {
      console.error('Customer ID is null. User might not be logged in.');
    }
    
    if (isNaN(this.paymentTypeId)) {
      console.error('Payment Type ID is NaN. Please check the payment type setup.');
    }
    
    this.products = this.orderService.getCurrentOrderProducts();
  }

  removeProduct(productId: number): void {
    this.orderService.removeProductFromCurrentOrder(productId);
    this.products = this.orderService.getCurrentOrderProducts();
  }

  finalizeOrder(): void {
    if (this.customerId === null || this.paymentTypeId === null) {
      console.error('Customer ID or Payment Type ID is null. Cannot finalize order.');
      return;
    }
    
    console.log("Obteniendo el ID del order");
    let orderId = this.orderService.getCurrentOrderId();

    if (this.products.length === 0) {
      console.error("No hay productos en la orden.");
      return;
    }

    if (orderId === 0) {
      const orderRequest = new OrderRequestDTO();
      orderRequest.customerId = this.customerId;
      orderRequest.paymentTypeId = this.paymentTypeId;
      orderRequest.products = this.products;

      console.log("Enviando solicitud de creación de orden:", orderRequest);

      this.orderService.createOrder(orderRequest).subscribe(orderResponse => {
        orderId = orderResponse.orderId;
        this.orderService.setCurrentOrderId(orderId);

        console.log('Order finalized:', orderResponse);
        this.router.navigate(['/order/details', orderResponse.orderId]);
        // Ahora, agregar los productos a la orden creada
        this.products.forEach(product => {
          this.orderService.addProductToOrder(orderId, product).subscribe();
        });
        // Limpiar la orden actual después de finalizarla
        this.orderService.setCurrentOrderId(0);
        this.orderService.clearCurrentOrderProducts();
      }, error => {
        console.error('ERROR', error);
      });
    } else {
      this.products.forEach(product => {
        this.orderService.addProductToOrder(orderId, product).subscribe();
      });

      this.orderService.finalizeOrder(orderId).subscribe(orderResponse => {
        console.log('Order finalized:', orderResponse);
        this.router.navigate(['/order/details', orderResponse.orderId]);

        // Limpiar la orden actual después de finalizarla
        this.orderService.setCurrentOrderId(0);
        this.orderService.clearCurrentOrderProducts();
      }, error => {
        console.error('ERROR', error);
      });
    }
  }
}
