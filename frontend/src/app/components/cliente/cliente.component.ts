import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  // CLIENTES
  public clientesObs: Observable<Cliente[]>;
  public clientes: Cliente[] = [];
  docTipos: any[] = [
    { name: 'CUIT', value: 80 },
    { name: 'CUIL', value: 86 },
    { name: 'DNI', value: 96 }
  ];
  // PAGINACION
  actualPageClientes: number = 1;
  //ELEMENTOS DEL COMPONENTE
  edicion = false;
  inicial = true;
  busqueda = false;

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.clientesObs = this.clienteService.getClientes();
    this.clientesObs.subscribe(cl => this.clientes = cl);
  }

  // HABILITAR DIFERENTES ELEMENTOS DEL COMPONENTE

  habilitarEdicion() {
    this.edicion = true;
    this.inicial = false;
  }

  habilitarInicial() {
    this.edicion = false;
    this.inicial = true;
    this.clientesObs.subscribe(cl => this.clientes = cl);
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
  }

  CheckValidation(form: NgForm) {
    var formulario = document.forms["clienteForm"];
    for (let i = 0; i < formulario.length; i++) {
      if (formulario[i].type != 'hidden' && (formulario[i].tagName == 'INPUT' || formulario[i].tagName == 'SELECT'))
        if (formulario[i].value == '') {
          alert('Debe completarse el campo ' + formulario[i].name);
          return;
        } else if (formulario[i].name === 'precio' && formulario[i].value < 0) {
          alert('No puede ingresarse valores negativos para el precio');
          return;
        }
    }
    this.addCliente(form);
  }

  addCliente(form : NgForm){
    if (form.value.id == null){
      this.clienteService.postCliente(form.value)
      .subscribe(res => {
        this.resetForm(form);
        if (res == 1062) {
          alert('No pudo crearse el producto. Ya existía un producto con el código ingresado.')
        } else {
          this.clientesObs.subscribe(cl => this.clientes = cl);
        }
      })
    }
    else {
      this.clienteService.putCliente(form.value)
      .subscribe(res => {
        this.resetForm(form);
        if (res == 1062) {
          alert('No pudo actualizarse el producto. Ya existía un producto con el código ingresado.')
        } else {
          this.clientesObs.subscribe(cl => this.clientes = cl);
        }
      })
    }
  }

  editCliente(cliente: Cliente){
    this.clienteService.selectedCliente = new Cliente(cliente.id, cliente.nombre, cliente.doc_tipo, cliente.doc_nro, cliente.telefono, cliente.doc_descripcion);
  }

  deleteCliente(id : number){
    if (confirm('Desea eliminar el cliente?')){
      this.clienteService.deleteCliente(id)
      .subscribe(res => {
        this.clientesObs.subscribe(cl => this.clientes = cl);
      })
    }
  }

}
