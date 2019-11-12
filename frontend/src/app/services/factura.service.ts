import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Factura } from '../models/factura';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private http : HttpClient) { }

  getFacturasFecha(fecha : string) {
    return this.http.get<Factura[]>(`http://localhost:3000/facturacion/` + fecha);
  }
}
