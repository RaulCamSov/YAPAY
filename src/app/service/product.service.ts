import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Product } from '../model/product';
import { HttpClient } from '@angular/common/http';

const baseUrl = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ProductService {//se utilizan las rutas del BACKEND
  private url = `${baseUrl}`;
  private listaCambio = new Subject<Product[]>();
  constructor(private http: HttpClient){ }

  list() : Observable<any>{
    console.log(this.url + "/Products");
    return this.http.get<Product[]>(this.url + "/Products");
  }

  setList(listaNueva : Product[]){
    this.listaCambio.next(listaNueva);
  }

insert(data: FormData): Observable<any> {
    return this.http.post(`${this.url}/Products`, data);
}


  getList() {
    return this.listaCambio.asObservable();
  }

  search(name?: string, size?: string) {//añadimos el termino "?" para que el parametro sea opcional y asi evitar errores durante el funcionamiento
    let params: { [key: string]: string | number | boolean } = {};
    if (name) {
      params['name'] = name;
    }
    if (size) {
      params['size'] = size;
    }
    return this.http.get(this.url + "/Products/search", { params });
  }
  
  listSoldProducts() {
    return this.http.get(this.url +  "/Products/sold");
  }

  getProductById(id: number) { //TESTEO -> FUNCIONA
    console.log("ListId:"+ `${this.url+"/Products"}/${id}`)
    return this.http.get<Product>(`${this.url}/Products/${id}`);
  }


  searchSoldProductsByName(name?: string ) { 
    let params: { [key: string]: string | number | boolean } = {};
    if (name) {
      params['name'] = name;
    }
    return this.http.get(this.url + "/sold/search", { params });
  }

  searchByBrand(brand?: string) {
    let params: { [key: string]: string | number | boolean } = {};
    if (brand) {
      params['brand'] = brand;
    }
    return this.http.get(`${this.url}/byBrand`, { params });
  }

  update(data: FormData, id: number): Observable<any> {
    return this.http.put(`${this.url}/Products/${id}`, data);
  }


} 
