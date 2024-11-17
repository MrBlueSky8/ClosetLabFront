import { Carrito } from "./carrito"
import { Prenda } from "./prenda"

export class CarritoPrenda{
    idcarrito_prenda:number=0
    carrito:Carrito=new Carrito()
    prenda:Prenda=new Prenda()
    cantidad:number=0
}