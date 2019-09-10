import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductoComponent } from './components/producto/producto.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductoFilterCodigoPipe } from './components/producto/producto-filter-codigo.pipe';
import { ProductoFilterDescripcionPipe } from './components/producto/producto-filter-descripcion.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProductoComponent,
    ProductoFilterCodigoPipe,
    ProductoFilterDescripcionPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
