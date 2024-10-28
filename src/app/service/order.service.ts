import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { OrderRequestDTO } from '../model/order-request-dto';
import { OrderResponseDTO } from '../model/order-response-dto';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderProductDTO } from '../model/order-product-dto';


const baseUrl = environment.base;

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private currentOrderProducts: OrderProductDTO[] = [];
  private currentOrderId: number = 0;
  private orderProductsSubject = new BehaviorSubject<OrderProductDTO[]>([]);

  constructor(private http: HttpClient) { }

  createOrder(orderRequestDTO: OrderRequestDTO): Observable<OrderResponseDTO> {
    return this.http.post<OrderResponseDTO>(`${baseUrl}/orders/create`, orderRequestDTO);
  }

  addProductToOrder(orderId: number, orderProductDTO: OrderProductDTO): Observable<OrderResponseDTO> {
    return this.http.post<OrderResponseDTO>(`${baseUrl}/orders/${orderId}/addProduct`, orderProductDTO);
  }

  addProductToCurrentOrder(orderProductDTO: OrderProductDTO): void {
    this.currentOrderProducts.push(orderProductDTO);
    this.orderProductsSubject.next(this.currentOrderProducts);
  }

  getCurrentOrderProducts(): OrderProductDTO[] {
    return this.currentOrderProducts;
  }

  removeProductFromCurrentOrder(productId: number): void {
    this.currentOrderProducts = this.currentOrderProducts.filter(product => product.productId !== productId);
    this.orderProductsSubject.next(this.currentOrderProducts);
  }

  finalizeOrder(orderId: number): Observable<OrderResponseDTO> {
    return this.http.get<OrderResponseDTO>(`${baseUrl}/orders/${orderId}`);
  }

  getCurrentOrderId(): number {
    return this.currentOrderId;
  }

  setCurrentOrderId(orderId: number): void {
    this.currentOrderId = orderId;
  }

  getOrderDetails(orderId: number): Observable<OrderResponseDTO> {
    return this.http.get<OrderResponseDTO>(`${baseUrl}/orders/get/${orderId}`);
  }

  clearCurrentOrderProducts(): void {
    this.currentOrderProducts = [];
    this.orderProductsSubject.next(this.currentOrderProducts);
  }


}
