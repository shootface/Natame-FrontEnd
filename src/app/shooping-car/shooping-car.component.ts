import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { Producto } from '../_models/productos';
import { Cliente } from '../_models/cliente';
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
  private clientes = [];
  private cliente = null;
  private identificacion = null;
  private sub = 0;
  private tax = 0;
  private total = 0;
  private doc = null;

  ngOnInit() {
    console.log('INICIE');
    if(this.gestionarcredencialesService.obtenerItems()){
      this.shoopPro = this.gestionarcredencialesService.obtenerItems();
    }
    console.log(this.shoopPro);
    this.sub = 0;
    this.tax = 0;
    this.total = 0;
    this.tarifas();
    this.doc = this.gestionarcredencialesService.obtenerUsuarioActual();
    this.getClientes();
  }

  tarifas(){
    for(let pro of this.shoopPro){
      this.sub = this.sub + (pro.info.precio * pro.cantidad);
      this.tax = this.tax + (pro.info.precio * pro.cantidad * pro.info.impuesto);
    }
    console.log('tax: ',this.sub);
    console.log('tax: ',this.tax);
    this.total = this.sub + this.tax;
  }

  onPay(event,id:string){
    for(let pro of this.shoopPro){
        this.productos.push(
          {
            "inventario":pro.inventario,
            "cantidad":pro.cantidad
          }
        )
      }
    console.log(this.productos);
    this.authenticationService.registarPedido(id,this.shoopPro)
    .subscribe(
      res => {
        console.log('Success: ', res);
      },
      error => {
        console.log(error);
        alert(error['error']['message']);
        //alert(error['error']['text']);
      }
    )
    this.productos = [];
  }

  getClientes(){
    this.authenticationService.getClientes()
    .subscribe(
      (res:Cliente[]) => {
        this.clientes = res;
        //console.log('Clientes: ', res);
      },
      error => {
        alert(error['error']['message']);
      }
    );
  }

  capturar() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.cliente = this.identificacion;
}
}
//31
//35
//39