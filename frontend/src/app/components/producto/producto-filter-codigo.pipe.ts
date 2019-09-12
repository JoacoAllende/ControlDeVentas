import { PipeTransform, Pipe } from '@angular/core';
import { Producto } from 'src/app/models/producto';

@Pipe({
    name: 'codigoFilter'
})
export class ProductoFilterCodigoPipe implements PipeTransform {
    transform(productos: Producto[], busquedaCodigo: string): Producto[] {
        if (!productos || !busquedaCodigo) {
            return productos;
        }
        return productos.filter(producto => producto.codigo.indexOf(busquedaCodigo) !== -1);
    }
}