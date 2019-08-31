import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { NgForm } from '@angular/forms';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  constructor(private productoService : ProductoService) { }

  ngOnInit() {
    this.getProductos();
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
        this.getProductos();
      })
    }
    else {
      this.productoService.putProducto(form.value)
      .subscribe(res => {
        this.resetForm(form);
        this.getProductos();
      })
    }
  }

  deleteProducto(id : number){
    if (confirm('Desea eliminar el producto?')){
      this.productoService.deleteProducto(id)
      .subscribe(res => {
        this.getProductos();
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