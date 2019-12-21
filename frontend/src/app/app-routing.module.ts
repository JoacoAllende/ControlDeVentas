import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductoComponent } from './components/producto/producto.component';
import { VentaComponent } from './components/venta/venta.component';
import { FacturaComponent } from './components/factura/factura.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  { path: 'productos', component: ProductoComponent },
  { path: 'ventas', component: VentaComponent },
  { path: 'facturas', component: FacturaComponent },
  { path: 'clientes', component: ClienteComponent },
  { path: 'login', component: LoginComponent},
  { path: '**', redirectTo: 'productos'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }