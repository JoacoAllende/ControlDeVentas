import { PipeTransform, Pipe } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';

@Pipe({
    name: 'nombreFilter'
})
export class VentaFilterCodigoPipe implements PipeTransform {
    transform(clientes: Cliente[], busquedaNombre: string): Cliente[] {
        if (!clientes || !busquedaNombre) {
            return clientes;
        }
        return clientes.filter(cl => cl.nombre.toLocaleLowerCase().indexOf(busquedaNombre.toLocaleLowerCase()) !== -1);
    }
}