import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';
import { Venta } from '../models/venta';
import { DetalleVenta } from '../models/detalle-venta';
import { Factura } from '../models/factura';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  selectedProducto : Producto;
  selectedVenta : DetalleVenta[];
  ventas : Venta[];

  constructor(private http : HttpClient) { 
    this.selectedProducto = new Producto(null,"","",null);
    this.selectedVenta = [];
    this.ventas = [];
  }

  getProducto(codigo : number){
    return this.http.get(`http://localhost:3000/productos/` + codigo);
  }

  postVenta(venta : Venta){
    return this.http.post(`http://localhost:3000/ventas`,venta);
  }

  getVenta(fecha : string){
    return this.http.get<Venta[]>(`http://localhost:3000/ventas/` + fecha);
  }

  getDetalles(id_venta : number){
    return this.http.get<DetalleVenta[]>(`http://localhost:3000/detalles/` + id_venta);
  }

  postFactura(factura : Factura){
    return this.http.post(`http://localhost:3000/facturacion/`, factura);
  }
}
