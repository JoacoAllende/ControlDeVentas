import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { NgForm } from '@angular/forms';
import { Producto } from 'src/app/models/producto';
import { Observable } from 'rxjs';
import * as jsPDF from 'jspdf';

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

  constructor(private productoService : ProductoService) { }

  ngOnInit() {
    this.productosObs = this.productoService.getProductos();
    this.productosObs.subscribe(prod => this.productos = prod);
  }

  downloadPDF() {
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
    doc.text('27000.00', 140, 119, 'right');
    doc.text('0.00', 160, 119, 'right');
    doc.text('0.00', 180, 119, 'right');
    doc.text('27000.00', 198, 119, 'right');
    //RECTANGULO FINAL
    doc.setFontSize(10);
    doc.rect(10, 220, doc.internal.pageSize.width - 20, 40, 'S');
    doc.text('Subtotal: $', 165, 230, 'right');
    doc.text('27000.00', 198, 230, 'right');
    doc.text('Imp. Otros Tributos: $', 165, 240, 'right');
    doc.text('  0.00', 198, 240, 'right');
    doc.text('Importe Total: $', 165, 250, 'right');
    doc.text('27000.00', 198, 250, 'right');
    //CAE Y FEC. VENC.
    doc.setFontSize(11);
    doc.text('CAE N°: ', 166, 266, 'right');
    doc.text('69438332408238', 168, 266, 'left');
    doc.text('Fecha de Vto. de CAE: ', 166, 273, 'right');
    doc.text('01/11/2019', 168, 273, 'left');
    //PDF
    doc.save('Test.pdf');
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
    this.productoService.selectedProducto = new Producto(producto.id, producto.descripcion, producto.codigo, producto.precio);
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