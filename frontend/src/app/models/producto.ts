export class Producto {

    constructor(id, descripcion, codigo, precio){
            this.id = id;
            this.descripcion = descripcion;
            this.precio = precio;
            this.codigo = codigo;
    }

    id: number;
    codigo: string;
    descripcion: string;
    precio: number;

}
