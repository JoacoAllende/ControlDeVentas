import { Component, OnInit} from '@angular/core';
import { DetalleVenta } from 'src/app/models/detalle-venta';
import { VentaService } from '../../services/venta.service';
import { Producto } from 'src/app/models/producto';
import { Venta } from 'src/app/models/venta';
import { Observable } from 'rxjs';
import * as jsPDF from 'jspdf';
import { FacturaAfip } from 'src/app/models/facturaAfip';
import { NgForm } from '@angular/forms';
import { FacturaLocal } from 'src/app/models/facturaLocal';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

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
  edicion = false;
  //ELEMENTOS DE LA VENTA
  public detallesVenta: DetalleVenta[] = [];
  public detallesVentaResumen: DetalleVenta[] = [];
  public resumenVentas: Venta[] = [];
  public resumenVentasObservable: Observable<Venta[]>;
  public detallesVentaObservable: Observable<DetalleVenta[]>;
  public clientes: Cliente[] = [];
  public clientesObs: Observable<Cliente[]>;
  codigo: number;
  cantidad: number;
  total: number = 0;
  id_venta;
  fecha;
  clienteSelected = 1;
  //PAGINACIÓN
  actualPageVentas: number = 1;
  actualPageDetalles: number = 1;
  //FACTURACION
  docTipos: any[] = [
    { name: 'CUIT', value: 80 },
    { name: 'CUIL', value: 86 },
    { name: 'DNI', value: 96 },
    { name: 'Doc. (Otro)', value: 99}
  ];
  docTipoSelected;
  docNroSelected;
  razonSocialSelected;
  cbteTipos: any = [
    { name: 'Factura B', value: 6 },
    { name: 'Factura C', value: 11 }
  ];
  cbteTipoSelected = 11;
  //FILTRO PIPE
  busquedaNombre: string;

  constructor(private ventaService: VentaService, private clienteService: ClienteService) { }

  ngOnInit() {
    const hoy = new Date();
    const mes = hoy.getMonth() + 1;
    const año = hoy.getFullYear();
    const dia = hoy.getDate();
    let fecha;
    if (dia.toString().length == 1) {
      fecha =  año + '-' + mes + '-0' + dia;
    } else {
      fecha =  año + '-' + mes + '-' + dia;
    }
    this.fecha = fecha;
    this.cambiarFecha(fecha);
    this.detallesVentaObservable = this.ventaService.getDetalles(this.id_venta);
    this.detallesVentaObservable.subscribe(det => this.detallesVenta = det);
    this.clientesObs = this.clienteService.getAllClientes();
    this.clientesObs.subscribe(cl => this.clientes = cl);
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
      const venta = new Venta(null, this.clienteSelected, this.total, this.detallesVenta)
      this.ventaService.postVenta(venta)
        .subscribe(res => {
        })
      this.habilitarInicial();
    }
  }

  modificarVenta(id_cliente){
    if (id_cliente != '') {
      if (confirm('Desea modificar el cliente de la venta?')) {
        const venta = new Venta(this.id_venta, id_cliente, null, null);
        this.ventaService.putVentaCliente(this.id_venta,venta)
          .subscribe(res => {
            this.resumenVentasObservable.subscribe(vent => this.resumenVentas = vent);
            this.edicion = false;
          })
      }
      this.busquedaNombre = '';
    } else {
      alert('Se debe seleccionar un cliente');
      this.edicion = false;
      this.busquedaNombre = '';
    }
  }

  cancelarModificarVenta(){
    this.edicion = false;
    this.busquedaNombre = '';
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
    this.factura = false;
    this.edicion = false;
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

  comenzarFactura(id_venta, total, docTipo, docNro, facturado, razonSocial, id_cliente) {
    if (!facturado) {
      this.total = total;
      this.id_venta = id_venta;
      this.docTipoSelected = docTipo;
      this.docNroSelected = docNro;
      this.razonSocialSelected = razonSocial;
      this.factura = true;
      this.clienteSelected = id_cliente;
      this.ventaService.getDetalles(id_venta)
      .subscribe(res => {
        this.id_venta = id_venta;
      })
    } else {
      alert('La venta ya ha sido facturada');
      this.factura = false;
      this.detallesVenta = [];
    }
  }

  facturar(form: NgForm) {
    if (confirm('Desea realizar la factura?')) {
      let tot = form.value.impTotal;
      const facturaAfip = new FacturaAfip(form.value.cbteTipoSelected, form.value.docTipoSelected, form.value.dniNro, form.value.impNeto, form.value.impTotal);
      this.ventaService.postFacturaAfip(facturaAfip)
      .subscribe(res => {
          const today = new Date();
          const fecha = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
          const fechaEmisionPDF = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
          const nroComprobante = res['voucherNumber'];
          let nro_cae = res['CAE'];
          let cae_fec_vto = res['CAEFchVto'];
          const facturaLocal = new FacturaLocal(this.id_venta, nro_cae, fecha, this.cbteTipoSelected, 1, nroComprobante, this.clienteSelected, tot);
          this.ventaService.postFacturaLocal(facturaLocal)
          .subscribe(res => {
            this.ventaService.putVenta(this.id_venta)
            .subscribe(res => {
              this.ventaService.getDetalles(this.id_venta)
              .subscribe(res => {
                this.detallesVenta = res as DetalleVenta[];
                this.facturaPdf(this.cbteTipos.find(o => o.value === this.cbteTipoSelected).name, this.cbteTipoSelected, nroComprobante, fechaEmisionPDF,
                                this.docTipos.find(o => o.value === this.docTipoSelected).name, this.docNroSelected, this.razonSocialSelected, tot, nro_cae, cae_fec_vto, this.detallesVenta);
                this.factura = false;
                this.edicion = false;
                this.detallesVenta = [];
              })
            })
          })
          
        })
      this.habilitarInicial();
    }

  }

  editVenta(venta) {
    this.clienteSelected = venta.id_cliente;
    this.id_venta = venta.id_venta;
    this.edicion = true;
    this.factura = false;
    this.detallesVenta = [];
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
    this.clienteSelected = 1;
  }

  habilitarInicial() {
    this.inicial = true;
    this.venta = false
    this.resumen = false;
    this.factura = false;
    this.edicion = false;
    this.detallesVenta = [];
    this.busquedaNombre = '';
    this.total = 0;
    this.cantidad = null;
    this.codigo = null
  }

  onKeydown(event) {
    if (event.key === "Enter") {
      this.addProducto(this.codigo, this.cantidad);
    }
  }

  facturaPdf(tipoFactura, codFactura, nroComprobante, fechaEmision, tipoDocumento, nroDocumento, razonSocial, impTotal, nro_cae, cae_fec_vto, detallesVenta) {
    const doc = new jsPDF();
    const cantHojas = Math.floor(detallesVenta.length / 28);
    let array;
    for (let index = 0; index <= cantHojas; index++) {
      if (index < cantHojas) {
        array = detallesVenta.slice(index * 28, index * 28 + 27);  
      } else {
        array = detallesVenta.slice(index * 28, detallesVenta.length);  
      }
      //ORIGINAL
      doc.rect(10, 6, doc.internal.pageSize.width - 20, 10, 'S');
      doc.text('ORIGINAL', doc.internal.pageSize.width / 2, 13.2, 'center');
      //PRIMER RECTÁNGULO
      doc.rect(10, 16, doc.internal.pageSize.width - 20, 60, 'S');
      doc.line(doc.internal.pageSize.width / 2, 30, doc.internal.pageSize.width / 2, 76);
      //CUADRO TIPO FACTURA
      doc.rect(doc.internal.pageSize.width / 2 - 7, 16, 14, 14, 'S');
      doc.setFontSize(24);
      doc.text(tipoFactura[tipoFactura.length - 1], doc.internal.pageSize.width / 2, 24, 'center');
      doc.setFontSize(8);
      let cod = 'COD. ';
      for (let index = 0; index < (3 - codFactura.toString().length); index++) {
        cod += '0'
      }
      cod += codFactura;
      doc.text(cod, doc.internal.pageSize.width / 2, 28, 'center');
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
      let nroComp = '';
      for (let index = 0; index < (8 - nroComprobante.toString().length); index++) {
         nroComp += '0'
      }
      nroComp += nroComprobante;
      doc.text('Punto de Venta: 00001    Comp. Nro: ' + nroComp,(doc.internal.pageSize.width / 2) + 5, 35, 'left');
      doc.text('Fecha de Emisión:  ' + fechaEmision,(doc.internal.pageSize.width / 2) + 5, 42, 'left');
      doc.text('CUIT:  20379855068',(doc.internal.pageSize.width / 2) + 5, 52, 'left');
      doc.text('Ingresos Brutos:  2037985506',(doc.internal.pageSize.width / 2) + 5, 59, 'left');
      doc.text('Fecha de Inicio de Actividades:  01/12/2018',(doc.internal.pageSize.width / 2) + 5, 66, 'left');
      //SEGUNDO RECTANGULO
      let documentoCompleto = tipoDocumento + ': ' + nroDocumento;
      doc.rect(10, 78, doc.internal.pageSize.width - 20, 11, 'S');
      doc.text(documentoCompleto, 15, 85, 'left');
      doc.text('Razón Social: ' + razonSocial, (doc.internal.pageSize.width / 2) + 5, 85, 'left');
      //TITULOS DETALLES
      doc.setFontSize(9);
      doc.setDrawColor(0);
      doc.setFillColor(169,169,169);
      doc.rect(10, 91, doc.internal.pageSize.width - 20, 10, 'FD');
      doc.text('Descripción', 20, 96, 'left');
      doc.text('Cantidad', 85, 96, 'left');
      doc.text('U. medida', 105, 96, 'left');
      doc.text('Precio Unit.', 125, 96, 'left');
      doc.text('% Bonif.', 145, 96, 'left');
      doc.text('Imp. Bonif.', 165, 96, 'left');
      doc.text('Subtotal', 185, 96, 'left');
      //DETALLES
      doc.setFontSize(8);
      let altura = 108;
      array.forEach(element => {
        if (element.descripcion.length > 50)
          element.descripcion = element.descripcion.substring(0,49);
        doc.text(element.descripcion, 10, altura, 'left');
        doc.text(element.cantidad.toString(), 100, altura, 'right');
        doc.text('unidades', 115, altura, 'center');
        doc.text((element.precio_detalle / element.cantidad).toString(), 140, altura, 'right');
        doc.text('0.00', 160, altura, 'right');
        doc.text('0.00', 180, altura, 'right');
        doc.text(element.precio_detalle.toString(), 198, altura, 'right');
        altura += 4;
      });
      //RECTANGULO FINAL
      doc.setFontSize(10);
      doc.rect(10, 220, doc.internal.pageSize.width - 20, 40, 'S');
      doc.text('Subtotal: $', 165, 230, 'right');
      doc.text(impTotal.toString(), 198, 230, 'right');
      doc.text('Imp. Otros Tributos: $', 165, 240, 'right');
      doc.text('  0.00', 198, 240, 'right');
      doc.text('Importe Total: $', 165, 250, 'right');
      doc.text(impTotal.toString(), 198, 250, 'right');
      //CAE Y FEC. VENC.
      doc.setFontSize(11);
      doc.text('CAE N°: ', 166, 266, 'right');
      doc.text(nro_cae, 168, 266, 'left');
      doc.text('Fecha de Vto. de CAE: ', 166, 273, 'right');
      let fechaDividida = cae_fec_vto.split('-');
      let fecha = fechaDividida[2] + '/' + fechaDividida[1] + '/' + fechaDividida[0];
      doc.text(fecha, 168, 273, 'left');
      if (index < cantHojas)
        doc.addPage();
    }
    //PDF
    doc.save('Test.pdf');
  }

}
