import { Component, OnInit, ɵConsole } from '@angular/core';
import { DetalleVenta } from 'src/app/models/detalle-venta';
import { VentaService } from '../../services/venta.service';
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
  codigo: number;
  cantidad: number;
  total: number = 0;
  id_venta;

  constructor(private ventaService: VentaService) { }

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

  addProducto(codigo: number, cantidad: number) {
    if (cantidad == null)
      cantidad = 1;
    if (codigo == null) {
      alert('Debe ingresarse un código');
    } else if (codigo.toString().length != 12) {
      alert('La longitud del código debe ser de 12')
    } else {
      if (cantidad <= 0) {
        alert('La cantidad del producto debe ser mayor a 0');
      } else if (!Number.isInteger(cantidad)) {
        alert('La cantidad del producto debe ser un número entero');
      } else {
        this.ventaService.getProducto(codigo)
          .subscribe(res => {
            if ((<any>res).length > 0) {
              this.ventaService.selectedProducto = res as Producto;
              const producto = this.ventaService.selectedProducto[0];
              const detalle = this.detallesVenta.filter(det => (det.codigo == producto.codigo));
              if (detalle.length == 0)
                this.detallesVenta.push(new DetalleVenta(producto.id, producto.codigo, producto.descripcion, cantidad, producto.precio * cantidad));
              else {
                this.detallesVenta = this.detallesVenta.filter(det => (det.codigo != producto.codigo));
                cantidad += detalle[0].cantidad;
                this.total -= detalle[0].precio_detalle;
                this.detallesVenta.push(new DetalleVenta(producto.id, producto.codigo, producto.descripcion, cantidad, producto.precio * cantidad));
              }
              this.total += producto.precio * cantidad;
            } else {
              alert('No existe el código ingresado');
            }
          })
      }
    }
    this.resetearProximoProducto();
    window.setTimeout(function () {
      document.getElementById("codigoProducto").focus();
    }, 0);
  }

  deleteDetalle(detalle) {
    if (confirm('Desea quitar el producto de la venta?')) {
      this.detallesVenta = this.detallesVenta.filter(det => (det.codigo != detalle.codigo));
      this.total -= detalle.precio_detalle;
    }
  }

  resetearProximoProducto() {
    this.cantidad = null;
    this.codigo = null;
  }

  // CONFIRMACIÓN DE VENTA

  finalizarVenta() {
    if (confirm('Desea finalizar la venta?')) {
      const venta = new Venta(this.total, this.detallesVenta)
      this.ventaService.postVenta(venta)
        .subscribe(res => {
        })
      this.habilitarInicial();
    }
  }

  // VENTAS

  verVentas() {
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

  getDetalles(id_venta) {
    this.total = 0;
    this.ventaService.getDetalles(id_venta)
      .subscribe(res => {
        this.id_venta = id_venta;
        this.detallesVenta = res as DetalleVenta[];
        this.detallesVenta.forEach(detalle => {
          this.total += detalle.precio_detalle;
        });
      })
  }

  // HABILITAR DIFERENTES ELEMENTOS DEL COMPONENTE

  iniciarVenta() {
    window.setTimeout(function () {
      document.getElementById("codigoProducto").focus();
    }, 0);
    this.venta = true;
    this.inicial = false;
    this.resumen = false;
    this.detallesVenta = [];
    this.total = 0;
  }

  habilitarInicial() {
    this.inicial = true;
    this.venta = false
    this.resumen = false;
    this.detallesVenta = [];
    this.total = 0;
    this.cantidad = null;
    this.codigo = null
  }

  onKeydown(event) {
    if (event.key === "Enter") {
      this.addProducto(this.codigo, this.cantidad);
    }
  }

}
