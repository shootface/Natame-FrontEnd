import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Representante } from '../_models/representante';

import { AuthService } from '../_services/auth.service';
import { Region } from '../_models/region';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  logged_in:boolean;
  public regiones = [];
  constructor(
    //private router:Router,
    private authService:AuthService,
    private router: Router
  ) { 
    this.regiones=[];
    this.authService.getRegiones()
    .subscribe(
      (res:Region[]) => {
        this.regiones = res;
        console.log('Success: ', res);
        this.logged_in = false;
      },
      error => {
        alert(error['error']['message']);
        this.logged_in = true;
      }
    );
  }
  public isError = false;
  public msgError = '';

  public representante: Representante = {
    identificacion: null,
    grado:null,
    esDirector:null,
    type:null,
    username:null,
    nombre: null,
    correoelectronico: null,
    genero: null,
    fechaNacimiento: null,
    fechaContrato: new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear(),
    telefonoContacto: null,
    direccion: null,
    region: null
  };

  ngOnInit() {
  }
  onRegister(form: NgForm): void {
    if (form.valid) {
      let TempfechaNa = this.representante.fechaNacimiento.split("-");
      let fechaNa = TempfechaNa[2] + "-" + TempfechaNa[1] + "-" + TempfechaNa[0];
      console.log(fechaNa)
      this.authService
        .registerRep(
          this.representante.identificacion,
          this.representante.nombre,
          this.representante.grado,
          this.representante.esDirector,
          this.representante.type,
          this.representante.username,
          this.representante.correoelectronico,
          this.representante.genero,
          fechaNa,
          this.representante.fechaContrato,
          this.representante.telefonoContacto,
          this.representante.direccion,
          this.representante.region
          )
        .subscribe(
          response => {
            console.log('Success: ', response);
            this.router.navigate(['login']);
          },
          error => {
            alert(error['error']['message']);
          }
        );
    }
  }
}
