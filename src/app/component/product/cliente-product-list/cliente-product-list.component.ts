import { Component, OnInit } from '@angular/core';
import { Product } from '../../../model/product';
import { ProductService } from '../../../service/product.service';
import { Route, Router } from '@angular/router';
import { OrderService } from '../../../service/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderProductDTO } from '../../../model/order-product-dto';
import { OrderResponseDTO } from '../../../model/order-response-dto';


@Component({
  selector: 'app-cliente-product-list',
  templateUrl: './cliente-product-list.component.html',
  styleUrl: './cliente-product-list.component.css'
})
export class ClienteProductListComponent implements OnInit {
  products: Product[] = [];
  quantities: { [key: number]: number } = {}; // Initialize an object to track quantities

  constructor(
    private productService: ProductService, 
    private router: Router,    
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.productService.list().subscribe(data => {
      this.products = data;
      this.products.forEach(product => {
        this.quantities[product.id_product] = 1; // Initialize each product quantity to 1
      });
    });
  }

  viewProductDetails(productId: number): void {
    this.router.navigate(['/product/details', productId]);
  }

  updateQuantity(productId: number, quantity: number): void {
    this.quantities[productId] = quantity;
  }

  addToOrder(event: Event, product: Product): void {
    event.stopPropagation(); // Detener la propagación del evento de clic
    const orderProduct: OrderProductDTO = {
      productId: product.id_product,
      quantity: this.quantities[product.id_product], // Use the quantity from the object
    };
    
    this.orderService.addProductToCurrentOrder(orderProduct);
    // Mostrar el mensaje de éxito
    this.snackBar.open('Producto agregado a tu orden', 'Cerrar', {
      duration: 3000,
      panelClass: ['snackbar-success']
    });
  }
}
