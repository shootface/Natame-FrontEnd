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

  public shoopPro = [];
  public productos = [];
  public clientes = [];
  public cliente = null;
  public clienteData = [];
  public identificacion = null;
  public metodoPago = null;
  public sub = 0;
  public tax = 0;
  public total = 0;
  public doc = null;

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
    for(let cli of this.clientes){
      if(cli.identificacion == this.identificacion){
        this.clienteData.push(
          {
            "identificacion":this.identificacion,
            "tipoid":cli.tipoid
          }
        )
      }
    }
    console.log(this.productos);
    this.authenticationService.registarPedido(this.metodoPago,this.clienteData,this.productos)
    .subscribe(
      res => {
        console.log('Success: ', res);
        alert(res['resultado']);
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
        console.log('Clientes: ', res);
      },
      error => {
        alert(error['error']['message']);
      }
    );
  }

  capturar() {
    console.log(this.identificacion);
  }

  capturarMetodo(){
    console.log(this.metodoPago);
  }
}
//31
//35
//39