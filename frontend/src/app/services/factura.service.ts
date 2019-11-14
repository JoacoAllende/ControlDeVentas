import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Factura } from '../models/factura';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  API_URI;

  constructor(private http : HttpClient, private globalService : GlobalService) {
    this.API_URI = globalService.API_URI;
   }

  getFacturasFecha(fecha : string) {
    return this.http.get<Factura[]>(`http://${this.API_URI}/facturacion/` + fecha);
  }
}
