import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { NgForm } from '@angular/forms';
import { Producto } from 'src/app/models/producto';
import { Observable } from 'rxjs';
import { Alicuota } from 'src/app/models/alicuota';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  //PRODUCTOS
  public productosObs: Observable<Producto[]>;
  public productos: Producto[] = [];
  //PAGINACIÓN
  actualPage : number = 1;
  //ORDEN
  order: string = 'descripcion';
  reverse: boolean = false;
  //ELEMENTOS DEL COMPONENTE
  edicion = false;
  inicial = true;
  busqueda = false;
  //FILTRO PIPE
  busquedaCodigo: string;
  busquedaDescripcion: string;
  //ALÍCUOTAS
  public alicuotasDisponiblesObs: Observable<Alicuota[]>;
  public alicuotasDisponibles: Alicuota[];

  constructor(private productoService : ProductoService) { }

  ngOnInit() {
    this.productosObs = this.productoService.getProductos();
    this.productosObs.subscribe(prod => this.productos = prod);
    this.alicuotasDisponiblesObs = this.productoService.getProductosAlicuotas();
    this.alicuotasDisponiblesObs.subscribe(alic => this.alicuotasDisponibles = alic);
  }

  // DISTINTOS ÓRDENES

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  // ALTA, BAJA Y MODIFICACIÓN DE PRODUCTOS

  getProductos(){
    this.productoService.getProductos()
      .subscribe(res => {
        this.productoService.productos = res as Producto[]; 
      })
  }

  editProducto(producto: Producto){
    this.productoService.selectedProducto = new Producto(producto.id, producto.descripcion, producto.codigo, producto.precio, producto.id_alicuota);
  }

  addProducto(form : NgForm){
    if (form.value.id == null){
      this.productoService.postProducto(form.value)
      .subscribe(res => {
        this.resetForm(form);
        if (res == 1062) {
          alert('No pudo crearse el producto. Ya existía un producto con el código ingresado.')
        } else {
          this.productosObs.subscribe(prod => this.productos = prod);
        }
      })
    }
    else {
      this.productoService.putProducto(form.value)
      .subscribe(res => {
        this.resetForm(form);
        if (res == 1062) {
          alert('No pudo actualizarse el producto. Ya existía un producto con el código ingresado.')
        } else {
          this.productosObs.subscribe(prod => this.productos = prod);
        }
      })
    }
  }

  deleteProducto(id : number){
    if (confirm('Desea eliminar el producto?')){
      this.productoService.deleteProducto(id)
      .subscribe(res => {
        this.productosObs.subscribe(prod => this.productos = prod);
      })
    }
  }
  
  resetForm(form?: NgForm){
    if(form){
      form.reset();
    }
  }

  CheckValidation(form : NgForm){
    var formulario = document.forms["productoForm"];
    for (let i = 0; i < formulario.length; i++){
      if(formulario[i].type != 'hidden' && formulario[i].tagName == 'INPUT') 
        if (formulario[i].value == '') {
          alert('Debe completarse el campo ' + formulario[i].name);
          return;
        } else if (formulario[i].name === 'precio' && formulario[i].value < 0) {
          alert('No puede ingresarse valores negativos para el precio');
          return;
        }
    }
    this.addProducto(form);
   }

   // HABILITAR DIFERENTES ELEMENTOS DEL COMPONENTE

   habilitarEdicion(){
     this.edicion = true;
     this.inicial = false;
   }

   habilitarInicial(){
    this.edicion = false;
    this.busqueda = false;
    this.inicial = true;
    this.productosObs.subscribe(prod => this.productos = prod);
    this.busquedaCodigo = '';
    this.busquedaDescripcion = '';
   }

   habilitarBusqueda(){
     this.busqueda = true;
     this.inicial = false;
   }

}