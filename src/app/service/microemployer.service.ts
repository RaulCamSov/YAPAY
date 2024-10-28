import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { MicroEmployer } from '../model/micro-employer';

const baseUrl = environment.base;

@Injectable({
  providedIn: 'root'
})
export class MicroemployerService {
  private url = `${baseUrl}`;
  private listaCambio = new Subject<MicroEmployer[]>();
  constructor(private http: HttpClient) {}

  list(): Observable<any> {
    console.log(this.url + "/Employer");
    return this.http.get<MicroEmployer[]>(this.url+"/Employer");
  }

  setList(listaNueva: MicroEmployer[]) {
    this.listaCambio.next(listaNueva);
  }

  insert(microemployer: MicroEmployer): Observable<any> {
    return this.http.post(`${this.url}/Employer`, microemployer);
  }


  getList(): Observable<MicroEmployer[]> {
    return this.listaCambio.asObservable();
  }

  update(microemployer: MicroEmployer): Observable<MicroEmployer> {
    return this.http.put<MicroEmployer>(`${this.url}/Employer/${microemployer.id_micro_employer}`, microemployer);
  }

  getMicroEmployerById(id: number): Observable<MicroEmployer> {
    console.log("ListId:"+ `${this.url+"/Employer"}/${id}`)
    return this.http.get<MicroEmployer>(`${this.url}/Employer/${id}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}