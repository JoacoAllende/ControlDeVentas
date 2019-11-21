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

  habilitarInicial(form?: NgForm) {
    if (form) {
      this.resetForm(form);
    }
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
    if (form.value.telefono == null)
      form.value.telefono = '';
    for (let i = 0; i < formulario.length; i++) {
      if (formulario[i].type != 'hidden' && (formulario[i].tagName == 'INPUT' || formulario[i].tagName == 'SELECT') && formulario[i].name != 'telefono')
        if (formulario[i].value == '') {
          console.log(formulario[i]);
          alert('Debe completarse el campo ' + formulario[i].name);
          return;
        } else if (formulario[i].name === 'precio' && formulario[i].value < 0) {
          alert('No puede ingresarse valores negativos para el precio');
          return;
        }
    }
    this.addCliente(form);
  }

  CuitCuilValido(cuit) {
    if (cuit.toString().length != 11) {
      alert("El CUIT/CUIL debe ser de 11 caracteres");
      return false;
    }
    var acumulado = 0;
    var digitos = cuit.toString().split("");
    var digito = digitos.pop();
    for (var i = 0; i < digitos.length; i++) {
      acumulado += digitos[9 - i] * (2 + (i % 6));
    }
    var verif = 11 - (acumulado % 11);
    if (verif == 11) {
      verif = 0;
    }
    if (digito != verif) {
      alert("El CUIT/CUIL ingresado es inválido");
      return false
    } else {
      return true;
    }
  }

  dniValido(dni) {
    if (dni.toString().length != 8) {
      alert("El DNI debe ser de 8 caracteres");
      return false;
    } else {
      return true;
    }
  }

  addCliente(form: NgForm) {
    if (form.value.doc_tipo == 80 || form.value.doc_tipo == 86) {
      if (this.CuitCuilValido(form.value.doc_nro)) {
        this.agregarCliente(form);
      }
    } else if (form.value.doc_tipo == 96) {
      if (this.dniValido(form.value.doc_nro)) {
        this.agregarCliente(form);
      }
    }
    this.resetForm(form);
  }

  agregarCliente(form: NgForm) {
    if (form.value.id == null) {
      this.clienteService.postCliente(form.value)
        .subscribe(res => {
          this.resetForm(form);
          if (res == 1062) {
            alert('No pudo crearse el cliente. Ya existía un cliente con el nro. de documento ingresado.')
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
            alert('No pudo modificarse el cliente. Ya existía un cliente con el nro. de documento ingresado.')
          } else {
            this.clientesObs.subscribe(cl => this.clientes = cl);
          }
        })
    }
  }

  editCliente(cliente: Cliente) {
    this.clienteService.selectedCliente = new Cliente(cliente.id, cliente.nombre, cliente.doc_tipo, cliente.doc_nro, cliente.telefono, cliente.doc_descripcion, cliente.cliente_responsable_inscripto);
  }

  deleteCliente(id: number) {
    if (confirm('Desea eliminar el cliente?')) {
      this.clienteService.deleteCliente(id)
        .subscribe(res => {
          this.clientesObs.subscribe(cl => this.clientes = cl);
        })
    }
  }

}
