export class Cliente {

    constructor(id, nombre, doc_tipo, doc_nro, telefono, descripcion, cliente_responsable_inscripto) {
        this.id = id;
        this.nombre = nombre;
        this.doc_tipo = doc_tipo;
        this.doc_nro = doc_nro;
        this.telefono = telefono
        this.doc_descripcion = descripcion;
        this.cliente_responsable_inscripto = cliente_responsable_inscripto;
    }

    id: number;
    nombre: string;
    doc_tipo: number;
    doc_nro: number;
    telefono: string
    doc_descripcion: string;
    cliente_responsable_inscripto: boolean;
}
