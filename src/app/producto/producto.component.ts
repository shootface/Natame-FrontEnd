import { Component, OnInit} from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Producto } from '../_models/productos';
import {Router} from '@angular/router';
import { GestionarcredencialesService } from '../_services/gestionarcredenciales.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  region_in:boolean;
  total:number = 0;
  private shoopPro = [];
  private productos = [];
  constructor(
    private authenticationService:AuthService,
    private gestionarcredencialesService:GestionarcredencialesService,
    private router: Router
  ) {
    if(this.gestionarcredencialesService.obtenerRegion()){
      this.listProductos();
    }
  }

  private producto:Producto = {
    nombreproducto:null,
    idproductoregion:null,
    cantidad:null,
    idProducto:null,
    precio: null
  }

  ngOnInit() {
  }

  listProductos(): void{
    this.authenticationService.getProductos()
    .subscribe(
      (res:Producto[]) => {
        this.productos = res;
        console.log('Success: ', res);
      },
      error => {
        console.log(error);
        alert(error['error']['message']);
      }
    )
  }

  onAdd(event,idproductoregion,can:number){
    console.log(idproductoregion);
    console.log("cantidad: "+can)
    for(let pro of this.productos){
      if(pro.inventario==idproductoregion){
        console.log(pro);
        this.shoopPro.push(
          {
            "inventario":idproductoregion,
            "cantidad":Number(can) 
          }
        )
        let temp:number = pro.precio*can;
        console.log("TEMP :"+temp);
        this.total = this.total + temp;
        console.log("TOTAL :"+this.total);
      }
    }
    console.log(this.total);
    console.log(this.shoopPro);
  }

  onSubmit(){
    this.gestionarcredencialesService.guardarItems(this.shoopPro);
  }
  onPay(event,id:string){
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
}
