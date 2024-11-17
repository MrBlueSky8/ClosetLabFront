import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Categoria } from '../models/categoria';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private url = `${base_url}/api/categoria`;
  private listacambio = new Subject<Categoria[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Categoria[]>(this.url);
  }
  insert(tdu: Categoria) {
    return this.http.post(this.url, tdu);
  }
  setList(listaNueva: Categoria[]) {
    this.listacambio.next(listaNueva);
  }
  getList() {
    return this.listacambio.asObservable();
  }
  listId(id:number){
    return this.http.get<Categoria>(`${this.url}/${id}`)
  }
  update(tdu: Categoria){
    return this.http.put(this.url, tdu);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
