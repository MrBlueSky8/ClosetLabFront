import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MetodoPago } from '../models/metodopago';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class MetodopagoService {
  private url = `${base_url}/api/metodo-pago`;
  private listacambio = new Subject<MetodoPago[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<MetodoPago[]>(this.url);
  }
  insert(tdn: MetodoPago) {
    return this.http.post(this.url, tdn);
  }
  setList(listaNueva: MetodoPago[]) {
    this.listacambio.next(listaNueva);
  }
  getList() {
    return this.listacambio.asObservable();
  }
  listId(id:number){
    return this.http.get<MetodoPago>(`${this.url}/${id}`)
  }
  update(tde: MetodoPago){
    return this.http.put(this.url, tde);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
