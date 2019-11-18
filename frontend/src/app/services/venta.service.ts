import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';
import { Venta } from '../models/venta';
import { DetalleVenta } from '../models/detalle-venta';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  selectedProducto : Producto;
  selectedVenta : DetalleVenta[];
  ventas : Venta[];
  API_URI;

  constructor(private http : HttpClient, private globalService : GlobalService) { 
    this.selectedProducto = new Producto(null,"","",null, null);
    this.selectedVenta = [];
    this.ventas = [];
    this.API_URI = globalService.API_URI;
  }

  postVenta(venta : Venta){
    return this.http.post(`http://${this.API_URI}/ventas`,venta);
  }

  getVenta(fecha : string){
    return this.http.get<Venta[]>(`http://${this.API_URI}/ventas/` + fecha);
  }

  getVentaDetalles(id_venta : number){
    return this.http.get<DetalleVenta[]>(`http://${this.API_URI}/ventas/detalles/` + id_venta);
  }

  putVenta(id_venta : number){
    return this.http.put(`http://${this.API_URI}/ventas/` + id_venta, null);
  }

  putVentaCliente(id_venta: number, venta: Venta){
    return this.http.put(`http://${this.API_URI}/ventas/cliente/` + id_venta, venta);
  }
}
