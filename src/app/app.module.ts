import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductoComponent } from './producto/producto.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { RegistrarClienteComponent } from './registrar-cliente/registrar-cliente.component';
import { LogOutComponent } from './log-out/log-out.component';
import { PopupRegionComponent } from './popup-region/popup-region.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComisionComponent } from './comision/comision.component';
import { ShoopingCarComponent } from './shooping-car/shooping-car.component';
import { RegionComponent } from './region/region.component';
import { VentaComponent } from './venta/venta.component';
import { CalificacionComponent } from './calificacion/calificacion.component';
import { PedidosComponent } from './pedidos/pedidos.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ProductoComponent,
    RegisterComponent,
    HomeComponent,
    RegistrarClienteComponent,
    LogOutComponent,
    PopupRegionComponent,
    ComisionComponent,
    ShoopingCarComponent,
    RegionComponent,
    VentaComponent,
    CalificacionComponent,
    PedidosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
