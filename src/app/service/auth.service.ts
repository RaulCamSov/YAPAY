import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registeruser } from '../model/registeruser';
import { Customer } from '../model/customer';
import { MicroEmployer } from '../model/micro-employer';
import { User } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerURL = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<number> {
    return this.http.post<number>(`${this.registerURL}/users/save`, user);
  }

  assignRoleToUser(userId: number, roleId: number): Observable<any> {
    return this.http.post(`${this.registerURL}/users/save/${userId}/${roleId}`, {});
  }

  registerCustomer(customer: Customer): Observable<any> {
    return this.http.post(`${this.registerURL}/api/customer`, customer);
  }

  registerEmployer(employer: MicroEmployer): Observable<any> {
    return this.http.post(`${this.registerURL}/api/Employer`, employer);
  }
}
