import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { NgForm } from '@angular/forms';
import { Producto } from 'src/app/models/producto';
import {RouterModule} from '@angular/router';

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

}