import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentType } from '../model/payment-type';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const baseUrl = environment.base;


@Injectable({
  providedIn: 'root'
})
export class PaymentTypeService {
  private paymentTypeURL = `${baseUrl}/payment-type`;


  constructor(private http: HttpClient) { }

  registerPaymentType(paymentType: PaymentType): Observable<any> {
    return this.http.post(this.paymentTypeURL, paymentType);
  }

  getPaymentTypes(): Observable<PaymentType[]> {
    return this.http.get<PaymentType[]>(this.paymentTypeURL);
  }

  getPaymentTypeById(id: number): Observable<PaymentType> {
    return this.http.get<PaymentType>(`${this.paymentTypeURL}/${id}`);
  }
}
