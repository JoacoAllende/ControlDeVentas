import { Component, OnInit } from '@angular/core';
import { DetalleVenta } from 'src/app/models/detalle-venta';
import { VentaService  } from '../../services/venta.service';
import { Producto } from 'src/app/models/producto';
import { Venta } from 'src/app/models/venta';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {

  //ELEMENTOS DEL COMPONENTE
  inicial = true;
  venta = false;
  //ELEMENTOS DE LA VENTA
  public detallesVenta: DetalleVenta[] = [];
  codigo : number;
  cantidad : number;
  total : number = 0;

  constructor(private ventaService : VentaService) { }

  ngOnInit() {
  }

  // GENERACIÓN DE VENTA EN MEMORIA

  addProducto(codigo:number, cantidad:number){
    this.ventaService.getProducto(codigo)
      .subscribe(res => {
        this.ventaService.selectedProducto = res as Producto;
        const producto = this.ventaService.selectedProducto[0];
        this.detallesVenta.push(new DetalleVenta(producto.id, producto.codigo, producto.descripcion, cantidad, producto.precio * cantidad));
        this.total += producto.precio * cantidad;
        this.resetearProximoProducto();
      })
  }

  resetearProximoProducto(){
    this.cantidad = null;
    this.codigo = null;
  }

  // CONFIRMACIÓN DE VENTA

    finalizarVenta(){
      if (confirm('Desea finalizar la venta?')){
        const venta = new Venta(this.total, this.detallesVenta)
        this.ventaService.postVenta(venta)
        .subscribe(res => {
        })
        this.habilitarInicial();
      }
    }

  // HABILITAR DIFERENTES ELEMENTOS DEL COMPONENTE

  iniciarVenta(){
    this.venta = true;
    this.inicial = false;
    this.detallesVenta = [];
    this.total = 0;
  }

  habilitarInicial(){
    this.inicial = true;
    this.venta = false
    this.detallesVenta = [];
    this.total = 0;
    this.cantidad = null;
    this.codigo = null
   }

}
