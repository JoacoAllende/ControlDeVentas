import { PipeTransform, Pipe } from '@angular/core';
import { Producto } from 'src/app/models/producto';

@Pipe({
    name: 'descripcionFilter'
})
export class ProductoFilterDescripcionPipe implements PipeTransform {
    transform(productos: Producto[], busquedaDescripcion: string): Producto[] {
        if (!productos || !busquedaDescripcion) {
            return productos;
        }
        return productos.filter(producto => producto.descripcion.toLocaleLowerCase().indexOf(busquedaDescripcion.toLowerCase()) !== -1);
    }
}