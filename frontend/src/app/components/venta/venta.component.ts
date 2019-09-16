import { Component, OnInit } from '@angular/core';
import { DetalleVenta } from 'src/app/models/detalle-venta';
import { VentaService  } from '../../services/venta.service';
import { Producto } from 'src/app/models/producto';
import { Venta } from 'src/app/models/venta';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {

  //ELEMENTOS DEL COMPONENTE
  inicial = true;
  venta = false;
  resumen = false;
  //ELEMENTOS DE LA VENTA
  public detallesVenta: DetalleVenta[] = [];
  public detallesVentaResumen: DetalleVenta[] = [];
  public resumenVentas: Venta[] = [];
  public resumenVentasObservable: Observable<Venta[]>;
  public detallesVentaObservable: Observable<DetalleVenta[]>;
  codigo : number;
  cantidad : number;
  total : number = 0;
  id_venta;

  constructor(private ventaService : VentaService) { }

  ngOnInit() {
    const hoy = new Date();
    const mes = hoy.getMonth() + 1;
    const fecha = hoy.getFullYear() + '-' + mes + '-' + hoy.getDate();
    this.resumenVentasObservable = this.ventaService.getVenta(fecha);
    this.resumenVentasObservable.subscribe(vent => this.resumenVentas = vent);
    this.detallesVentaObservable = this.ventaService.getDetalles(this.id_venta);
    this.detallesVentaObservable.subscribe(det => this.detallesVenta = det);
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

    // VENTAS

    verVentas(){
      this.venta = false;
      this.inicial = false;
      this.resumen = true;
      const hoy = new Date();
      const mes = hoy.getMonth() + 1;
      const fecha = hoy.getFullYear() + '-' + mes + '-' + hoy.getDate();
      this.ventaService.getVenta(fecha)
      .subscribe(res => {
        this.resumenVentasObservable.subscribe(vent => this.resumenVentas = vent);
      })
    }

    getDetalles(id_venta){
      this.ventaService.getDetalles(id_venta)
      .subscribe(res =>{
        this.id_venta = id_venta;
        this.detallesVenta = res as DetalleVenta[];
        this.detallesVenta.forEach(detalle => {
          this.total += detalle.precio_detalle;
        });
      })
    }

  // HABILITAR DIFERENTES ELEMENTOS DEL COMPONENTE

  iniciarVenta(){
    this.venta = true;
    this.inicial = false;
    this.resumen = false;
    this.detallesVenta = [];
    this.total = 0;
  }

  habilitarInicial(){
    this.inicial = true;
    this.venta = false
    this.resumen = false;
    this.detallesVenta = [];
    this.total = 0;
    this.cantidad = null;
    this.codigo = null
   }

}
