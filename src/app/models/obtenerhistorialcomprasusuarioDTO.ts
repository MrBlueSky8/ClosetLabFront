
export class ObtenerHistorialComprasUsuarioDTO{
    fecha_compra:Date= new Date(Date.now());
    nombre_prenda: string = '';
    descripcion_prenda: string = '';
    marca: string = ''; 
    categoria: string = '';  
    talla: string = '';
    tipo_prenda: string = '';
    metodo_pago: string = '';
    total_pago: number = 0;
}