import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { GestionarcredencialesService } from '../_services/gestionarcredenciales.service';

@Component({
  selector: 'app-shooping-car',
  templateUrl: './shooping-car.component.html',
  styleUrls: ['./shooping-car.component.css']
})
export class ShoopingCarComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private gestionarcredencialesService:GestionarcredencialesService,
    private router: Router) {
  }

  ngOnInit() {
    console.log('Carrito',this.gestionarcredencialesService.obtenerItems())
  }

}
