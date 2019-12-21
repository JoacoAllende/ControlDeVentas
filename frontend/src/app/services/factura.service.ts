import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Factura } from '../models/factura';
import { GlobalService } from './global.service';
import { FacturaAfip } from '../models/facturaAfip';
import { FacturaLocal } from '../models/facturaLocal';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  API_URI;
  headers: HttpHeaders;

  constructor(private http : HttpClient, private globalService : GlobalService) {
    this.API_URI = globalService.API_URI;
    this.headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"));
   }

  getFacturasFecha(fecha : string) {
    return this.http.get<Factura[]>(`http://${this.API_URI}/facturacion/` + fecha, { headers: this.headers });
  }

  postFacturaAfipC(factura : FacturaAfip){
    return this.http.post(`http://${this.API_URI}/facturacionAfipC/`, factura, { headers: this.headers });
  }

  postFacturaAfipB(factura : FacturaAfip){
    return this.http.post(`http://${this.API_URI}/facturacionAfipB/`, factura, { headers: this.headers });
  }

  postFacturaAfipA(factura : FacturaAfip){
    return this.http.post(`http://${this.API_URI}/facturacionAfipA/`, factura, { headers: this.headers });
  }

  postFacturaLocal(factura : FacturaLocal){
    return this.http.post(`http://${this.API_URI}/facturacionLocal/`, factura, { headers: this.headers });
  }
}
