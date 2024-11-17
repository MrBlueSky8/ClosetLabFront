import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { TipoUsuario } from '../models/tipousuario';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class TipousuarioService {
  private url = `${base_url}/api/tipos_usuario`;
  private listacambio = new Subject<TipoUsuario[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<TipoUsuario[]>(this.url);
  }
  insert(tdu: TipoUsuario) {
    return this.http.post(this.url, tdu);
  }
  setList(listaNueva: TipoUsuario[]) {
    this.listacambio.next(listaNueva);
  }
  getList() {
    return this.listacambio.asObservable();
  }
  listId(id:number){
    return this.http.get<TipoUsuario>(`${this.url}/${id}`)
  }
  update(tdu: TipoUsuario){
    return this.http.put(this.url, tdu);
  }
  eliminar(id: number) {
    console.log("Probando...");
    //return this.http.delete(`${this.url}/${id}`);
    
    return this.http.put(`${this.url}/eliminar?id=${id}`, null);
  }

}
