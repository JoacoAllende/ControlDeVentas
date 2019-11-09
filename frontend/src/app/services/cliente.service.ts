import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  selectedCliente : Cliente;

  constructor(private http : HttpClient) { 
    this.selectedCliente = new Cliente(null, null, null, null, null, null);
  }

   postCliente(cliente : Cliente){
    return this.http.post(`http://localhost:3000/clientes`,cliente);
   }

   putCliente(cliente : Cliente){
    return this.http.put(`http://localhost:3000/clientes`,cliente);
   }

   getClientes(){
    return this.http.get<Cliente[]>(`http://localhost:3000/clientes`);
   }

   deleteCliente(id: number){
     return this.http.delete(`http://localhost:3000/clientes/` + id);
   }
}
