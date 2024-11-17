import { Carrito } from "./carrito"
import { MetodoPago } from "./metodopago"
import { Usuario } from "./usuario"

export class Pago{
    id:number=0
    metodoPago:MetodoPago=new MetodoPago()
    carrito:Carrito=new Carrito()
    usuario:Usuario=new Usuario()    
    montoTotal: number=0
    fechaPago:Date= new Date(Date.now()) 
}