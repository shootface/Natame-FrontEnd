import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { GestionarcredencialesService } from '../_services/gestionarcredenciales.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  public pedidos = [];

  constructor(
    private authenticationService:AuthService,
    private gestionarcredencialesService:GestionarcredencialesService
  ) { }

  ngOnInit() {
    this.listarPedidos();
  }

  listarPedidos(){
    this.authenticationService.getPedidos()
    .subscribe(
      res => {
        this.pedidos = res;
        console.log('Success: ', res);
      },
      error => {
        console.log(error);
        alert(error['error']['message']);
        //alert(error['error']['text']);
      }
    )
  }

}
