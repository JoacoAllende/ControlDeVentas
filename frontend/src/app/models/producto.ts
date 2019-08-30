export class Producto {

    constructor(id = -1, descripcion = '', codigo = '', precio = 0){
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
