import { Component, OnInit } from '@angular/core';
import { OrderResponseDTO } from '../../../model/order-response-dto';
import { ActivatedRoute, Params } from '@angular/router';
import { OrderService } from '../../../service/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit {
  orderDetails: OrderResponseDTO = new OrderResponseDTO();
  orderId: number = 0;
  displayedColumns: string[] = ['productId', 'productName', 'quantity', 'subtotal'];

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    console.log("recuperando id del orderDetail")
    this.route.params.subscribe((data: Params) => {
      this.orderDetails.orderId = data['id'];
    console.log(this.orderDetails.orderId)
      this.init();
    });
  }

  init() {
    this.orderService.getOrderDetails(this.orderDetails.orderId).subscribe({
      next: (data) => {
        this.orderDetails = data;
        console.log("Detalles del pedido:", this.orderDetails);
      },
      error: (error) => {
        console.error('Error al obtener los detalles del pedido:', error);
      }
    });
  }
}
