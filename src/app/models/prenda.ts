import { Categoria } from "./categoria"
import { Marca } from "./marca"
import { Talla } from "./talla"
import { TipoPrenda } from "./tipoprenda"

export class Prenda{
    id:number=0
    nombre:string=""
    descipcion:string=""    
    marca: Marca=new Marca()
    talla: Talla=new Talla() 
    categoria: Categoria=new Categoria() 
    tipo: TipoPrenda=new TipoPrenda()  
    cantidadEnStock:number=0
}