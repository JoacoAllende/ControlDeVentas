import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  productos : Producto[];
  selectedProducto : Producto;

  constructor(private http : HttpClient) {
    this.productos = [];
    this.selectedProducto = new Producto;
   }

   postProducto(producto : Producto){
    return this.http.post(`http://localhost:3000/productos`,producto);
   }

   putProducto(producto : Producto){
    return this.http.put(`http://localhost:3000/productos`,producto);
   }

   getProductos(){
    return this.http.get(`http://localhost:3000/productos`);
   }

   deleteProducto(id: number){
     return this.http.delete(`http://localhost:3000/productos` + id);
   }

}