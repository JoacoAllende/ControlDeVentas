import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/cliente';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  selectedCliente : Cliente;
  API_URI;

  constructor(private http : HttpClient, private globalService : GlobalService) { 
    this.selectedCliente = new Cliente(null, null, null, null, null, null, null);
    this.API_URI = globalService.API_URI;
  }

   postCliente(cliente : Cliente){
    return this.http.post(`http://${this.API_URI}/clientes`,cliente);
   }

   putCliente(cliente : Cliente){
    return this.http.put(`http://${this.API_URI}/clientes`,cliente);
   }

   getClientes(){
    return this.http.get<Cliente[]>(`http://${this.API_URI}/clientes`);
   }

   getAllClientes(){
    return this.http.get<Cliente[]>(`http://${this.API_URI}/Allclientes`);
   }

   deleteCliente(id: number){
     return this.http.delete(`http://${this.API_URI}/clientes/` + id);
   }
}
