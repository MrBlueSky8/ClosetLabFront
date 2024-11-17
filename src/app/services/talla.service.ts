import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Talla } from '../models/talla';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class TallaService {
  private url = `${base_url}/api/talla`;
  private listacambio = new Subject<Talla[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Talla[]>(this.url);
  }
  insert(tdu: Talla) {
    return this.http.post(this.url, tdu);
  }
  setList(listaNueva: Talla[]) {
    this.listacambio.next(listaNueva);
  }
  getList() {
    return this.listacambio.asObservable();
  }
  listId(id:number){
    return this.http.get<Talla>(`${this.url}/${id}`)
  }
  update(tdu: Talla){
    return this.http.put(this.url, tdu);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
