import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Carrito } from '../models/carrito';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private url = `${base_url}/api/carrito`;
  private listacambio = new Subject<Carrito[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Carrito[]>(this.url);
  }
  insert(tdn: Carrito) {
    return this.http.post(this.url, tdn);
  }
  setList(listaNueva: Carrito[]) {
    this.listacambio.next(listaNueva);
  }
  getList() {
    return this.listacambio.asObservable();
  }
  listId(id:number){
    return this.http.get<Carrito>(`${this.url}/${id}`)
  }
  update(tde: Carrito){
    return this.http.put(this.url, tde);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
