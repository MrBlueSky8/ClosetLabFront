import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CarritoPrenda } from '../models/carritoprenda';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ObtenerPrendasMasVendidasPorMarcaDTO } from '../models/obtenerPrendasMasVendidasPorMarcaDTO';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class CarritoprendaService {
  private url = `${base_url}/api/carritoPrenda`;
  private listacambio = new Subject<CarritoPrenda[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<CarritoPrenda[]>(this.url);
  }
  insert(tdn: CarritoPrenda) {
    return this.http.post(this.url, tdn);
  }
  setList(listaNueva: CarritoPrenda[]) {
    this.listacambio.next(listaNueva);
  }
  getList() {
    return this.listacambio.asObservable();
  }
  listId(id:number){
    return this.http.get<CarritoPrenda>(`${this.url}/${id}`)
  }
  update(tde: CarritoPrenda){
    return this.http.put(this.url, tde);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  getprendasmasvendidas(): Observable<ObtenerPrendasMasVendidasPorMarcaDTO[]> {
    return this.http.get<ObtenerPrendasMasVendidasPorMarcaDTO[]>(
      `${this.url}/prendasmasvendidas`
    );
  }

}
