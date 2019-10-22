import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductoComponent } from './producto/producto.component'; 
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { RegistrarClienteComponent } from './registrar-cliente/registrar-cliente.component';
import { PopupRegionComponent } from './popup-region/popup-region.component';
import { ComisionComponent } from './comision/comision.component'
import { ShoopingCarComponent } from './shooping-car/shooping-car.component';
import { RegionComponent } from './region/region.component';
import { VentaComponent } from './venta/venta.component';
import { from } from 'rxjs';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'pop',component:PopupRegionComponent},
  {path:'productos',component:VentaComponent},
  {path:'registro',component:RegisterComponent},
  {path:'regisCli',component:RegistrarClienteComponent},
  {path:'comision',component:ComisionComponent},
  {path:'login',component:LoginComponent},
  {path:'Car',component:ShoopingCarComponent},
  {path: '**',component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
