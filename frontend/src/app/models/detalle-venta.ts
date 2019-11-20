export class DetalleVenta {
    constructor(id_producto, codigo, descripcion, cantidad, precio_detalle, alicuota, id_alicuota){
        this.id_producto = id_producto;
        this.cantidad = cantidad;
        this.precio_detalle = precio_detalle;
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.alicuota = alicuota;
        this.id_alicuota = id_alicuota;
    }

    id_producto: number;
    descripcion: string;
    codigo: number;
    cantidad: number;
    precio_detalle: number;
    alicuota: number;
    id_alicuota: number;
}
