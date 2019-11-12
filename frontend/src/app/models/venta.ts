import { DetalleVenta } from './detalle-venta';

export class Venta {

constructor(id_venta, id_cliente, total, detalles){
    this.id_venta = id_venta;
    this.id_cliente = id_cliente;
    this.total = total;
    this.detalles = detalles;
}

id_venta: number;
id_cliente: number;
total: number;
detalles: DetalleVenta[];
}
