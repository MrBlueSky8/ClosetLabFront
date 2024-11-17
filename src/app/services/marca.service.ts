import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Marca } from '../models/marca';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  private url = `${base_url}/api/marca`;
  private listacambio = new Subject<Marca[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Marca[]>(this.url);
  }
  insert(tdu: Marca) {
    return this.http.post(this.url, tdu);
  }
  setList(listaNueva: Marca[]) {
    this.listacambio.next(listaNueva);
  }
  getList() {
    return this.listacambio.asObservable();
  }
  listId(id:number){
    return this.http.get<Marca>(`${this.url}/${id}`)
  }
  update(tdu: Marca){
    return this.http.put(this.url, tdu);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
