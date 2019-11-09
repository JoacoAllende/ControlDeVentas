import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Factura } from 'src/app/models/factura';
import { FacturaService } from 'src/app/services/factura.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  //FACTURAS
  public facturasObs: Observable<Factura[]>;
  public facturas: Factura[] = [];
  fecha;
  //PAGINACIÓN
  actualPageFacturas: number = 1;

  constructor(private facturaService : FacturaService) { }

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
    this.facturasObs = this.facturaService.getFacturasFecha(fecha);
    this.facturasObs.subscribe(fact => this.facturas = fact);
  }

  cambiarFecha(fecha: string) {
    this.facturasObs= this.facturaService.getFacturasFecha(fecha);
    this.facturasObs.subscribe(fact => this.facturas = fact);
  }

}
