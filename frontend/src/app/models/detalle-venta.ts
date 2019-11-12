export class DetalleVenta {
    constructor(id_producto, codigo, descripcion, cantidad, precio_detalle){
        this.id_producto = id_producto;
        this.cantidad = cantidad;
        this.precio_detalle = precio_detalle;
        this.codigo = codigo;
        this.descripcion = descripcion;
    }

    id_producto: number;
    descripcion: string;
    codigo: number;
    cantidad: number;
    precio_detalle: number;
}
