import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Headers } from '@angular/http';
import { Cliente } from '../models/cliente';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  selectedCliente : Cliente;
  API_URI;
  headers: HttpHeaders;

  constructor(private http : HttpClient, private globalService : GlobalService) { 
    this.selectedCliente = new Cliente(null, null, null, null, null, null, null);
    this.API_URI = globalService.API_URI;
    this.headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"));
  }

   postCliente(cliente : Cliente){
    return this.http.post(`http://${this.API_URI}/clientes`,cliente, { headers: this.headers });
   }

   putCliente(cliente : Cliente){
    return this.http.put(`http://${this.API_URI}/clientes`,cliente, { headers: this.headers });
   }

   getClientes(){
     console.log(this.headers);
    return this.http.get<Cliente[]>(`http://${this.API_URI}/clientes`, { headers: this.headers });
   }

   getAllClientes(){
    return this.http.get<Cliente[]>(`http://${this.API_URI}/Allclientes`, { headers: this.headers });
   }

   deleteCliente(id: number){
     return this.http.delete(`http://${this.API_URI}/clientes/` + id, { headers: this.headers });
   }
}
