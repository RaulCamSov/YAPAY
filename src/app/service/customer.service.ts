import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Customer } from '../model/customer';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const baseUrl = environment.base;

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private url = `${baseUrl}`;
  private listaCambio = new Subject<Customer[]>();
  constructor(private http: HttpClient){ }

  list(): Observable<any> {
    console.log(this.url + "/customer");
    return this.http.get<Customer[]>(this.url+ "/customer");
  }  
  
  setList(listaNueva: Customer[]) {
    this.listaCambio.next(listaNueva);
  }

  insert(customer: Customer): Observable<any> {
    return this.http.post(`${this.url}/customer`, customer);
  }
 

  getList(): Observable<Customer[]> {
    return this.listaCambio.asObservable();
  }

  update(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.url}/customer/${customer.id_customer}`, customer);
  }

  getCustomerById(id: number): Observable<Customer> {
    console.log("ListId:"+ `${this.url+"/customer"}/${id}`)
    return this.http.get<Customer>(`${this.url}/customer/${id}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
