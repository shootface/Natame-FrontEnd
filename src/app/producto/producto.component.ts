import { Component, OnInit} from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Producto } from '../_models/productos';
import {Router} from '@angular/router';
import { GestionarcredencialesService } from '../_services/gestionarcredenciales.service';
import { resolve } from 'url';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  region_in:boolean;
  total:number = 0;
  public shoopPro = [];
  public productos = [];
  constructor(
    private authenticationService:AuthService,
    private gestionarcredencialesService:GestionarcredencialesService,
    private router: Router
  ) {
  }

  public producto:Producto = {
    nombreimagen: null,
    nombreproducto:null,
    idproductoregion:null,
    cantidad:null,
    idProducto:null,
    precio: null,
    impuesto: null
  }

  ngOnInit() {
    if(this.gestionarcredencialesService.obtenerItems()){
      this.shoopPro = this.gestionarcredencialesService.obtenerItems();
    }
    if(this.gestionarcredencialesService.obtenerRegion()){
      this.listProductos().then( e => {
        console.log('HOLO')
      }
      );
    }
  }

  async listProductos(){
    await this.authenticationService.getProductos()
    .then( res => {
      this.productos = res;
      console.log(res);
    }
    ).catch(
      error => {
        console.log(error);
        alert(error['error']['message']);
        }
    );
    
    //.subscribe(
    //  (res:Producto[]) => {
    //    this.productos = res;
    //    console.log('Success: ', res);
    //  },
    //  error => {
    //   console.log(error);
    //    alert(error['error']['message']);
    //  }
    //)
  }

  onAdd(event,idproductoregion,can:number,pro){
    console.log(idproductoregion);
    console.log("cantidad: "+can);
    let temp = true;
    let i=0;
    for(let pro of this.productos){
      if(this.shoopPro){
        for(let pro2 of this.shoopPro){ 
          if(pro2.inventario == idproductoregion){
            if(pro2.cantidad == can){
              temp = false;
            }else{
              console.log('Borrar: ',i);
              this.shoopPro.splice(i,1);
            }
          }
          i++;
        }
      }
      if(pro.inventario==idproductoregion && temp){
        //console.log(pro);
        this.shoopPro.push(
          {
            "inventario":idproductoregion,
            "cantidad":Number(can),
            "info":pro
          }
        )
      }
      console.log('i',i);
    }
    console.log(this.total);
    console.log(this.shoopPro);
  }

  onSubmit(){
    this.gestionarcredencialesService.guardarItems(this.shoopPro);
  }
}
