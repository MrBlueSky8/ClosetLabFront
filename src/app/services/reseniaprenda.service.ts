import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { ReseniaPrenda } from '../models/reseniaprenda';
import { HttpClient } from '@angular/common/http';
import { ObtenerReseñasDePrendaDTO } from '../models/obtenerReseñasDePrendaDTO';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ReseniaprendaService {
  private url = `${base_url}/api/reseña-prenda`;
  private listacambio = new Subject<ReseniaPrenda[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<ReseniaPrenda[]>(this.url);
  }
  insert(tdn: ReseniaPrenda) {
    return this.http.post(this.url, tdn);
  }
  setList(listaNueva: ReseniaPrenda[]) {
    this.listacambio.next(listaNueva);
  }
  getList() {
    return this.listacambio.asObservable();
  }
  listId(id:number){
    return this.http.get<ReseniaPrenda>(`${this.url}/${id}`)
  }
  update(tde: ReseniaPrenda){
    return this.http.put(this.url, tde);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  getcomentariosporprenda(id:number): Observable<ObtenerReseñasDePrendaDTO[]> {
    return this.http.get<ObtenerReseñasDePrendaDTO[]>(
      `${this.url}/comentariosporprenda/${id}`
    );
  }

}
