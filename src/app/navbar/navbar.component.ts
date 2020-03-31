import { Component, OnInit } from '@angular/core';
import { GestionarcredencialesService } from '../_services/gestionarcredenciales.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logged_in:boolean;
  public type = '';

  constructor(
    private gestionarcredencialesService:GestionarcredencialesService,
  ) { }

  ngOnInit() {
    if (this.gestionarcredencialesService.obtenerUsuarioActual()){
      this.logged_in = true;
    }else{
      this.logged_in = false;
    }
    this.type = this.gestionarcredencialesService.obtenerUserType();
  }

  closeSesion(){
    this.gestionarcredencialesService.borrarCredenciales();
    location.reload();
  }

}
