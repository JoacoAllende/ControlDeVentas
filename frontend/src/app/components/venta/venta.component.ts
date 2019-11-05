import { Component, OnInit, ɵConsole } from '@angular/core';
import { DetalleVenta } from 'src/app/models/detalle-venta';
import { VentaService } from '../../services/venta.service';
import { Producto } from 'src/app/models/producto';
import { Venta } from 'src/app/models/venta';
import { Observable } from 'rxjs';
import * as jsPDF from 'jspdf';
import { Factura } from 'src/app/models/factura';
import { NgForm } from '@angular/forms';

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
  factura = false;
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
  fecha;
  //PAGINACIÓN
  actualPageVentas: number = 1;
  actualPageDetalles: number = 1;
  //FACTURACION
  docTipos: any[] = [
    { name: 'CUIT', value: 80 },
    { name: 'CUIL', value: 86 },
    { name: 'DNI', value: 99 }
  ];
  docTipoSelected = 80;
  cbteTipos: any = [
    { name: 'Factura B', value: 6 },
    { name: 'Factura C', value: 11 }
  ];
  cbteTipoSelected = 11;

  constructor(private ventaService: VentaService) { }

  ngOnInit() {
    const hoy = new Date();
    const mes = hoy.getMonth() + 1;
    const fecha = hoy.getFullYear() + '-' + mes + '-' + hoy.getDate();
    this.fecha = hoy;
    this.cambiarFecha(fecha);
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
      this.total -= detalle.precio_detalle;
      this.detallesVenta = this.detallesVenta.filter(det => (det.codigo != detalle.codigo));
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

  cambiarFecha(fecha: string) {
    this.resumenVentasObservable = this.ventaService.getVenta(fecha);
    this.resumenVentasObservable.subscribe(vent => this.resumenVentas = vent);
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

  cancelar() {
    this.detallesVenta = [];
  }

  // FACTURACIÓN

  comenzarFactura(id_venta, total) {
    this.total = total;
    this.factura = true;
  }

  facturar(form: NgForm) {
    if (confirm('Desea realizar la factura?')) {
      const factura = new Factura(form.value.cbteTipoSelected, form.value.docTipoSelected, form.value.dniNro, form.value.impNeto, form.value.impTotal);
      this.ventaService.postFactura(factura)
        .subscribe(res => {
          const doc = new jsPDF();
          //ORIGINAL
          doc.rect(10, 6, doc.internal.pageSize.width - 20, 10, 'S');
          doc.text('ORIGINAL', doc.internal.pageSize.width / 2, 13.2, 'center');
          //PRIMER RECTÁNGULO
          doc.rect(10, 16, doc.internal.pageSize.width - 20, 60, 'S');
          doc.line(doc.internal.pageSize.width / 2, 30, doc.internal.pageSize.width / 2, 76);
          //CUADRO TIPO FACTURA
          doc.rect(doc.internal.pageSize.width / 2 - 7, 16, 14, 14, 'S');
          doc.setFontSize(24);
          doc.text('C', doc.internal.pageSize.width / 2, 24, 'center');
          doc.setFontSize(8);
          doc.text('COD. 011', doc.internal.pageSize.width / 2, 28, 'center');
          //PRIMER SUBRECTANGULO
          doc.setFontSize(20);
          doc.text('ALLENDE JOAQUIN', ((doc.internal.pageSize.width / 2)) / 2, 25, 'center');
          doc.setFontSize(12);
          doc.text('Razón Social: Allende Joaquín', 15, 35, 'left');
          doc.text('Domicilio comercial: Av. Buzón 452 Piso: PB \n Depto. 3 - Tandil, Buenos Aires', 15, 45, 'left');
          doc.text('Condición frente al IVA: Responsable \n Monotributo', 15, 60, 'left');
          //SEGUNDO SUBRECTANGULO
          doc.setFontSize(20);
          doc.text('FACTURA', (doc.internal.pageSize.width / 2) + 10, 25, 'left');
          doc.setFontSize(11);
          doc.text('Punto de Venta: 00001    Comp. Nro: 000000011',(doc.internal.pageSize.width / 2) + 5, 35, 'left');
          doc.text('Fecha de Emisión:  22/10/2019',(doc.internal.pageSize.width / 2) + 5, 42, 'left');
          doc.text('CUIT:  20379855068',(doc.internal.pageSize.width / 2) + 5, 52, 'left');
          doc.text('Ingresos Brutos:  2037985506',(doc.internal.pageSize.width / 2) + 5, 59, 'left');
          doc.text('Fecha de Inicio de Actividades:  01/12/2018',(doc.internal.pageSize.width / 2) + 5, 66, 'left');
          //SEGUNDO RECTANGULO
          doc.rect(10, 78, doc.internal.pageSize.width - 20, 22, 'S');
          doc.text('CUIT: 30645694607', 15, 85, 'left');
          doc.text('Condición frente al IVA:  Iva Sujeto Exento', 15, 95, 'left');
          doc.text('Razón Social: APPIDA', (doc.internal.pageSize.width / 2) + 5, 85, 'left');
          doc.text('Domicilio: España 1473 - Ayacucho, Buenos Aires', (doc.internal.pageSize.width / 2) + 5, 95, 'left');
          //TITULOS DETALLES
          doc.setFontSize(9);
          doc.setDrawColor(0);
          doc.setFillColor(169,169,169);
          doc.rect(10, 102, doc.internal.pageSize.width - 20, 10, 'FD');
          doc.text('Código', 20, 107, 'left');
          doc.text('Descripción', 40, 107, 'left');
          doc.text('Cantidad', 85, 107, 'left');
          doc.text('U. medida', 105, 107, 'left');
          doc.text('Precio Unit.', 125, 107, 'left');
          doc.text('% Bonif.', 145, 107, 'left');
          doc.text('Imp. Bonif.', 165, 107, 'left');
          doc.text('Subtotal', 185, 107, 'left');
          //DETALLES
          doc.setFontSize(8);
          doc.text('Desarrollo de sistemas de \nadministración e información \ngeneral para rectorado', 40, 119, 'left');
          doc.text('1.00', 100, 119, 'right');
          doc.text('unidades', 115, 119, 'center');
          doc.text(factura.impTotal.toString(), 140, 119, 'right');
          doc.text('0.00', 160, 119, 'right');
          doc.text('0.00', 180, 119, 'right');
          doc.text(factura.impTotal.toString(), 198, 119, 'right');
          //RECTANGULO FINAL
          doc.setFontSize(10);
          doc.rect(10, 220, doc.internal.pageSize.width - 20, 40, 'S');
          doc.text('Subtotal: $', 165, 230, 'right');
          doc.text(factura.impTotal.toString(), 198, 230, 'right');
          doc.text('Imp. Otros Tributos: $', 165, 240, 'right');
          doc.text('  0.00', 198, 240, 'right');
          doc.text('Importe Total: $', 165, 250, 'right');
          doc.text(factura.impTotal.toString(), 198, 250, 'right');
          //CAE Y FEC. VENC.
          doc.setFontSize(11);
          doc.text('CAE N°: ', 166, 266, 'right');
          doc.text(res['CAE'], 168, 266, 'left');
          doc.text('Fecha de Vto. de CAE: ', 166, 273, 'right');
          doc.text(res['CAEFchVto'], 168, 273, 'left');
          //PDF
          doc.save('Test.pdf');
        })
      this.habilitarInicial();
    }

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
