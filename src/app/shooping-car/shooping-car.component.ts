import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { Producto } from '../_models/productos';
import { GestionarcredencialesService } from '../_services/gestionarcredenciales.service';
import { element } from 'protractor';

@Component({
  selector: 'app-shooping-car',
  templateUrl: './shooping-car.component.html',
  styleUrls: ['./shooping-car.component.css']
})
export class ShoopingCarComponent implements OnInit {

  constructor(
    private authenticationService:AuthService,
    private gestionarcredencialesService:GestionarcredencialesService,
    private router: Router){
  }

  private shoopPro = [];
  private productos = [];

  private producto:Producto = {
    nombreimagen: null,
    cantidad: null,
    precio: null,
    nombreproducto: null,
    idproductoregion: null,
    idProducto: null
  }

  ngOnInit() {
    this.shoopPro = this.gestionarcredencialesService.obtenerItems();
    console.log(this.shoopPro);
  }
}
//31
//35
//39