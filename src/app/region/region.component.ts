import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import {GestionarcredencialesService} from '../_services/gestionarcredenciales.service';
import { Region } from '../_models/region';


@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {
  public regiones = [];

  constructor(private authService:AuthService,private gestioncredenciales:GestionarcredencialesService) {
    this.regiones=[];
    this.authService.getRegiones()
    .subscribe(
      (res:Region[]) => {
        this.regiones = res;
        console.log('Success: ', res);
      },
      error => {
        alert(error['error']['message']);
      }
    );
  }

  ngOnInit() {
  }
  setRegion(event,idregion){
    this.gestioncredenciales.setRegion(idregion);
    location.reload();
    //this.router.navigate(['productos']);
  }
}
