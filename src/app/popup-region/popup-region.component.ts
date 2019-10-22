import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import {GestionarcredencialesService} from '../_services/gestionarcredenciales.service'
import { Region } from '../_models/region';
import {Router} from '@angular/router';

@Component({
  selector: 'app-popup-region',
  templateUrl: './popup-region.component.html',
  styleUrls: ['./popup-region.component.css']
})
export class PopupRegionComponent implements OnInit {
  private regiones = [];
  constructor(
    private authService:AuthService,
    private gestioncredenciales:GestionarcredencialesService,
    private router: Router
  ) {
    this.regiones=[];
    this.authService.getRegiones()
    .subscribe(
      (res:Region[]) => {
        this.regiones = res;
        console.log('Success: ', res);
      },
      error => {
        alert(error['error']['text']);
      }
    );
  }

  ngOnInit() {
  }
}
