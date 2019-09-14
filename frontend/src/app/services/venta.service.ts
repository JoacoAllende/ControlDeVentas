import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';
import { Venta } from '../models/venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  selectedProducto : Producto;

  constructor(private http : HttpClient) { 
    this.selectedProducto = new Producto(null,"","",null);
  }

  getProducto(codigo: number){
    return this.http.get(`http://localhost:3000/productos` + codigo)
  }

  postVenta(venta : Venta){
    return this.http.post(`http://localhost:3000/ventas`,venta);
  }
}
