import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TipoPrenda } from '../models/tipoprenda';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class TipoprendaService {
  private url = `${base_url}/api/tipo-prenda`;
  private listacambio = new Subject<TipoPrenda[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<TipoPrenda[]>(this.url);
  }
  insert(tdu: TipoPrenda) {
    return this.http.post(this.url, tdu);
  }
  setList(listaNueva: TipoPrenda[]) {
    this.listacambio.next(listaNueva);
  }
  getList() {
    return this.listacambio.asObservable();
  }
  listId(id:number){
    return this.http.get<TipoPrenda>(`${this.url}/${id}`)
  }
  update(tdu: TipoPrenda){
    return this.http.put(this.url, tdu);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
