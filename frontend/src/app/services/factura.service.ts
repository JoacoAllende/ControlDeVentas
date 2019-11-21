import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Factura } from '../models/factura';
import { GlobalService } from './global.service';
import { FacturaAfip } from '../models/facturaAfip';
import { FacturaLocal } from '../models/facturaLocal';

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

  postFacturaAfipC(factura : FacturaAfip){
    return this.http.post(`http://${this.API_URI}/facturacionAfipC/`, factura);
  }

  postFacturaAfipB(factura : FacturaAfip){
    return this.http.post(`http://${this.API_URI}/facturacionAfipB/`, factura);
  }

  postFacturaAfipA(factura : FacturaAfip){
    return this.http.post(`http://${this.API_URI}/facturacionAfipA/`, factura);
  }

  postFacturaLocal(factura : FacturaLocal){
    return this.http.post(`http://${this.API_URI}/facturacionLocal/`, factura);
  }
}
