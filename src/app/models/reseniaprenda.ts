import { Prenda } from "./prenda"
import { Talla } from "./talla"
import { Usuario } from "./usuario"

export class ReseniaPrenda{
    id:number=0 
    prenda: Prenda=new Prenda()
    talla: Talla=new Talla() 
    usuario: Usuario=new Usuario() 
    comentario:string=""
    calificacion:number=0   
}