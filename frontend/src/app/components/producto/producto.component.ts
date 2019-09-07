import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { NgForm } from '@angular/forms';
import { Producto } from 'src/app/models/producto';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {


  public productosObs: Observable<Producto[]>;
  public productos: Producto[] = [];
  actualPage : number = 1;
  ordenCodigo = true;
  ordenDescripciones = false;
  ordenPrecio = true;

  constructor(private productoService : ProductoService) { }

  ngOnInit() {
    this.productosObs = this.productoService.getProductos();
    this.productosObs.subscribe(prod => this.productos = prod);
  }

  ordenarPrecios(){
    if (this.ordenPrecio){
      this.productos.sort(this.compararPrecio);
      this.ordenPrecio = false;
    } else {
      this.productos.sort(this.compararPrecio);
      this.productos.reverse();
      this.ordenPrecio = true;
    }
  }

  ordenarCodigos(){
    if (this.ordenCodigo){
      this.productos.sort(this.compararCodigo);
      this.ordenCodigo = false;
    } else {
      this.productos.sort(this.compararCodigo);
      this.productos.reverse();
      this.ordenCodigo = true;
    }
  }

  ordenarDescripciones(){
    if (this.ordenDescripciones) {
      this.productos.sort(this.compararDescripciones);
      this.ordenDescripciones = false;
    } else {
      this.productos.sort(this.compararDescripciones);
      this.productos.reverse();
      this.ordenDescripciones = true;
    }
  }

  compararDescripciones (a, b) {
    if (a.descripcion.toLowerCase() > b.descripcion.toLowerCase())
      return 1;
    else if (a.descripcion.toLowerCase() < b.descripcion.toLowerCase())
      return -1;
    else
      return 0;
  }

  compararPrecio (a, b) {
    return b.precio - a.precio;
  }

  compararCodigo (a, b) {
    return b.codigo - a.codigo;
  }

  getProductos(){
    this.productoService.getProductos()
      .subscribe(res => {
        this.productoService.productos = res as Producto[]; 
      })
  }

  editProducto(producto: Producto){
    this.productoService.selectedProducto = new Producto(producto.id, producto.descripcion, producto.codigo, producto.precio);
  }

  addProducto(form : NgForm){
    if (form.value.id == null){
      this.productoService.postProducto(form.value)
      .subscribe(res => {
        this.resetForm(form);
        this.productosObs = this.productoService.getProductos();
        this.productosObs.subscribe(prod => this.productos = prod);
      })
    }
    else {
      this.productoService.putProducto(form.value)
      .subscribe(res => {
        this.resetForm(form);
        this.productosObs = this.productoService.getProductos();
        this.productosObs.subscribe(prod => this.productos = prod);
      })
    }
  }

  deleteProducto(id : number){
    if (confirm('Desea eliminar el producto?')){
      this.productoService.deleteProducto(id)
      .subscribe(res => {
        this.productosObs = this.productoService.getProductos();
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
          this.resetForm();
          return;
        }
    }
    this.addProducto(form);
   }

}