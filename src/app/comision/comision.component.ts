import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { GestionarcredencialesService } from '../_services/gestionarcredenciales.service';

@Component({
  selector: 'app-comision',
  templateUrl: './comision.component.html',
  styleUrls: ['./comision.component.css']
})
export class ComisionComponent implements OnInit {
  constructor(
    private authenticationService:AuthService,
    private gestionarcredencialesService:GestionarcredencialesService
  ) { 
    this.authenticationService.getComision(Number(this.gestionarcredencialesService.obtenerUsuarioActual().replace("u","")))
    .subscribe(
      response => {
          console.log('Success: ', response);
          alert(response['comision'])
      },
      error => {
        alert(error['error']['message']);
      }
    )
  }

  ngOnInit() {
  }

}
