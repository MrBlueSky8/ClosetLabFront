import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Prenda } from '../models/prenda';
import { HttpClient } from '@angular/common/http';
import { ObtenerInventarioCriticoDTO } from '../models/obtenerInventarioCriticoDTO';
import { FiltrarProductosPorTallaYMarcaDTO } from '../models/filtrarProductosPorTallaYMarcaDTO';
import { ObtenerReporteCalificacionesProductosDTO } from '../models/obtenerReporteCalificacionesProductosDTO';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class PrendaService {
  private url = `${base_url}/api/prenda`;
  private listacambio = new Subject<Prenda[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Prenda[]>(this.url);
  }
  insert(tdn: Prenda) {
    return this.http.post(this.url, tdn);
  }
  setList(listaNueva: Prenda[]) {
    this.listacambio.next(listaNueva);
  }
  getList() {
    return this.listacambio.asObservable();
  }
  listId(id:number){
    return this.http.get<Prenda>(`${this.url}/${id}`)
  }
  update(tde: Prenda){
    return this.http.put(this.url, tde);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  gestStockByID(id: number): Observable<number> {
    return this.http.get<number>(`${this.url}/getstock/${id}`);
  }

  setStockById(id: number, stock: number) {
    console.log("Probando...");
    //return this.http.delete(`${this.url}/${id}`);
    
    return this.http.put(`${this.url}/setStockByid?id=${id}&stock=${stock}`, null);
  }

  getinventariocritico(): Observable<ObtenerInventarioCriticoDTO[]> {
    return this.http.get<ObtenerInventarioCriticoDTO[]>(
      `${this.url}/obtenerinventariocritico`
    );
  }

  getFiltradoporTallaYMarca(talla:number, marca:number): Observable<FiltrarProductosPorTallaYMarcaDTO[]> {
    return this.http.get<FiltrarProductosPorTallaYMarcaDTO[]>(
      `${this.url}/filtrarportallaymarca?talla=${talla}&marca=${marca}`
    );
  }

  getpromediopuntajeporprenda(): Observable<ObtenerReporteCalificacionesProductosDTO[]> {
    return this.http.get<ObtenerReporteCalificacionesProductosDTO[]>(
      `${this.url}/promediopuntajeporprenda`
    );
  }
}
