import { DetalleVenta } from './detalle-venta';

export class Venta {

constructor(total, detalles){
    this.total = total;
    this.detalles = detalles;
}
total: number;
detalles: DetalleVenta[];
}
