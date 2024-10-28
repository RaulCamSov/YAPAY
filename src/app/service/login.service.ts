import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Customer } from '../model/customer';
import { Credentials } from '../model/credentials';
import {map} from 'rxjs/operators';

const baseUrl = environment.base;


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = `${baseUrl}`;
  private httpHeaders = new HttpHeaders({ 'Access-Control-Allow-Origin': 'http://localhost:8080/api' });

  private roleSubject = new BehaviorSubject<string | null>(null);
  public role$ = this.roleSubject.asObservable();

  private paymentTypeIdSubject = new BehaviorSubject<number | null>(null);
  public paymentTypeId$ = this.paymentTypeIdSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadRoleFromLocalStorage();
    this.loadPaymentTypeIdFromLocalStorage();

  }

  login(creds: Credentials) {
    return this.http.post<any>('http://localhost:8080/authenticate', creds, {
      observe: 'response'
    }).pipe(map((response: HttpResponse<any>) => {
      const body = response.body;
      const headers = response.headers;
      const bearerToken = headers.get('Authorization')!;
      const token = bearerToken.replace('Bearer ', '');
      localStorage.setItem('token', token);
      localStorage.setItem('customerId', body.customerId);
      localStorage.setItem('paymentTypeId', body.paymentTypeId);
      localStorage.setItem('role', body.role);
      this.roleSubject.next(body.role);
      this.paymentTypeIdSubject.next(body.paymentTypeId);
      return body;
    }));
  }

  private loadRoleFromLocalStorage() {
    const role = this.getRole();
    if (role) {
      this.roleSubject.next(role);
    }
  }

  private loadPaymentTypeIdFromLocalStorage() {
    const paymentTypeId = this.getPaymentTypeId();
    if (paymentTypeId) {
      this.paymentTypeIdSubject.next(paymentTypeId);
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getCustomerId() {
    return Number(localStorage.getItem('customerId'));
  }

  getPaymentTypeId() {
    return Number(localStorage.getItem('paymentTypeId'));
  }

  getRole() {
    return localStorage.getItem('role');
  }

  closeSession() {
    localStorage.clear();
    this.roleSubject.next(null);
    this.paymentTypeIdSubject.next(null);
  }

  getAuthData() {
    return {
      token: this.getToken(),
      customerId: this.getCustomerId(),
      paymentTypeId: this.getPaymentTypeId(),
      role: this.getRole()
    };
  }
}

