import { EstadoCarrito } from "./estadocarrito"
import { Usuario } from "./usuario"

export class Carrito{
    id:number=0
    estadoCarrito:EstadoCarrito=new EstadoCarrito()
    usuario:Usuario=new Usuario()
}