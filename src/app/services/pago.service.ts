import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Pago } from '../models/pago';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ObtenerIngresosMensualesDTO } from '../models/obtenerIngresosMensualesDTO';
import { ObtenerHistorialComprasUsuarioDTO } from '../models/obtenerhistorialcomprasusuarioDTO';
import { obtenerClientesActivosxMesDTO } from '../models/obtenerClientesActivosxMesDTO';
import { ObtenerFrecuenciaMetodosPagoDTO } from '../models/obtenerFrecuenciaMetodosPagoDTO';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private url = `${base_url}/api/pago`;
  private listacambio = new Subject<Pago[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Pago[]>(this.url);
  }
  insert(tdn: Pago) {
    return this.http.post(this.url, tdn);
  }
  setList(listaNueva: Pago[]) {
    this.listacambio.next(listaNueva);
  }
  getList() {
    return this.listacambio.asObservable();
  }
  listId(id:number){
    return this.http.get<Pago>(`${this.url}/${id}`)
  }
  update(tde: Pago){
    return this.http.put(this.url, tde);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  getIngresosMensuales():Observable<ObtenerIngresosMensualesDTO[]>{
    return this.http.get<ObtenerIngresosMensualesDTO[]>(
      `${this.url}/ingresosmensuales`
    );
  }

  getHistorialComprasUsuario(id:number): Observable<ObtenerHistorialComprasUsuarioDTO[]> {
    console.log("Tratando de hacer consulta...", id);
    return this.http.get<ObtenerHistorialComprasUsuarioDTO[]>(
      `${this.url}/HistorialComprasUsuario/${id}`
    );
  }

  getClientesActivosxMes(): Observable<obtenerClientesActivosxMesDTO[]> {
    return this.http.get<obtenerClientesActivosxMesDTO[]>(
      `${this.url}/obtenerclientesactivospormes`
    );
  }

  getfrecuenciametodospago(): Observable<ObtenerFrecuenciaMetodosPagoDTO[]> {
    return this.http.get<ObtenerFrecuenciaMetodosPagoDTO[]>(
      `${this.url}/frecuenciametodospago`
    );
  }

}


