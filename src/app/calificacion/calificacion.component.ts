import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { GestionarcredencialesService } from '../_services/gestionarcredenciales.service';

@Component({
  selector: 'app-calificacion',
  templateUrl: './calificacion.component.html',
  styleUrls: ['./calificacion.component.css']
})
export class CalificacionComponent implements OnInit {
  
  public pedidos = [];
  public id= null;
  public calificacion = null;
  public idPago = null;
  
  constructor(
    private authenticationService:AuthService,
    private gestionarcredencialesService:GestionarcredencialesService
  ) { }

  ngOnInit() {
    this.listarPedidos();
  }
  
  capturar(){

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

  onCalificar(event,id,calificacion){
    this.authenticationService.calificarPedido(id,calificacion)
    .subscribe(
      res => {
        console.log('Success: ', res);
        alert(res['resultado']);
        location.reload();
      },
      error => {
        console.log(error);
        alert(error['error']['message']);
        //alert(error['error']['text']);
      }
    )
  }

  onPagar(event,idPago){
    this.authenticationService.pagar(idPago)
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
  }
  
}
