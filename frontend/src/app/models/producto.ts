export class Producto {

    constructor(id, descripcion, codigo, precio, id_alicuota) {
        this.id = id;
        this.descripcion = descripcion;
        this.precio = precio;
        this.codigo = codigo;
        this.id_alicuota = id_alicuota;
    }

    id: number;
    codigo: string;
    descripcion: string;
    precio: number;
    id_alicuota: number;

}
