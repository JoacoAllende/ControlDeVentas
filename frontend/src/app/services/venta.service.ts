import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';

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
}
