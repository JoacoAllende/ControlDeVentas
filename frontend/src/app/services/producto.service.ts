import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';
import { Alicuota } from '../models/alicuota';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  productos : Producto[];
  selectedProducto : Producto;
  API_URI;

  constructor(private http : HttpClient, private globalService : GlobalService) {
    this.productos = [];
    this.selectedProducto = new Producto(null,"","",null, 5);
    this.API_URI = globalService.API_URI;
   }

   postProducto(producto : Producto){
    return this.http.post(`http://${this.API_URI}/productos`,producto);
   }

   putProducto(producto : Producto){
    return this.http.put(`http://${this.API_URI}/productos`,producto);
   }

   getProductos(){
    return this.http.get<Producto[]>(`http://${this.API_URI}/productos`);
   }

   deleteProducto(id: number){
     return this.http.delete(`http://${this.API_URI}/productos/` + id);
   }

   getProducto(codigo : number){
    return this.http.get(`http://${this.API_URI}/productos/` + codigo);
  }

  getProductosAlicuotas(){
    return this.http.get<Alicuota[]>(`http://${this.API_URI}/productos-alicuotas`);
   }

}
