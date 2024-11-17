import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { EstadoCarrito } from '../models/estadocarrito';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class EstadocarritoService {
  private url = `${base_url}/api/estado-carrito`;
  private listacambio = new Subject<EstadoCarrito[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<EstadoCarrito[]>(this.url);
  }
  insert(tdu: EstadoCarrito) {
    return this.http.post(this.url, tdu);
  }
  setList(listaNueva: EstadoCarrito[]) {
    this.listacambio.next(listaNueva);
  }
  getList() {
    return this.listacambio.asObservable();
  }
  
  listId(id:number){
    return this.http.get<EstadoCarrito>(`${this.url}/${id}`)
  }
    
  update(tdu: EstadoCarrito){
    return this.http.put(this.url, tdu);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
