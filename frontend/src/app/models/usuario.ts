export class Usuario {

    constructor(id, nombre, password) {
        this.id = id;
        this.nombre = nombre;
        this.password = password;
    }

    id: number;
    nombre: string;
    password: string;
}