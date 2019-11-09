export class Cliente {

    constructor(id, nombre, doc_tipo, doc_nro, telefono, descripcion) {
        this.id = id;
        this.nombre = nombre;
        this.doc_tipo = doc_tipo;
        this.doc_nro = doc_nro;
        this.telefono = telefono
        this.doc_descripcion = descripcion;
    }

    id: number;
    nombre: string;
    doc_tipo: number;
    doc_nro: number;
    telefono: string
    doc_descripcion: string;
}
