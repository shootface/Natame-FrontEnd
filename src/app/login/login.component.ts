import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { UserInterface } from '../_models/UserInterface';

import { AuthService } from '../_services/auth.service';
import { GestionarcredencialesService } from '../_services/gestionarcredenciales.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logged_in:boolean;
  constructor(
    private authenticationService:AuthService,
    private gestionarcredencialesService:GestionarcredencialesService,
    private router: Router
  ) {
    if (this.gestionarcredencialesService.obtenerUsuarioActual()){
      this.logged_in = true;
      this.router.navigate(['productos']);
    }else{
      this.logged_in = false;
    }
  }
  private user: UserInterface = {
    username: '',
    password: '',
    type:''
  };

  public isError = false;

  ngOnInit() {}

  onLogin(form: NgForm) {
    console.log(this.user.type);
    if(form.valid){
      if(this.user.type == 'R'){
        console.log("REPRESENTANTE")
        console.log(this.user.username,this.user.password);
        this.authenticationService.loginRe(this.user.username,this.user.password).subscribe(
          response => {
            console.log('Success: ', response);
            this.gestionarcredencialesService.guardarCredenciales(this.user.username,this.user.password);
            //console.log("TYPE : ",response.tipoid)
            this.gestionarcredencialesService.guardarType(response.tipoid);
            this.gestionarcredencialesService.guardarUserType(this.user.type);
            this.gestionarcredencialesService.guardarId(response.identificacion);
            this.router.navigate(['home/']);
            location.reload();
          },
          error => {
            console.log(error);
            alert(error['error']['message']);
          }
        )
      }else if(this.user.type == 'C'){
        console.log("CLIENTE")
        console.log(this.user.username,this.user.password);
        this.authenticationService.loginCli(this.user.username,this.user.password).subscribe(
          response => {
            console.log('Success: ', response);
            console.log("TYPE : ",response.tipoid)
            this.gestionarcredencialesService.guardarCredenciales(this.user.username,this.user.password);
            this.gestionarcredencialesService.guardarType(response.tipoid);
            this.gestionarcredencialesService.guardarUserType(this.user.type);
            this.gestionarcredencialesService.guardarId(response.identificacion);
            this.router.navigate(['productos']);
            location.reload();
          },
          error => {
            console.log(error);
            alert(error['error']['message']);
          }
        )
      }
    }else{
      this.onIsError()
    }
  }

  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

  closeSesion(){
    this.gestionarcredencialesService.borrarCredenciales();
    this.logged_in = false;
    this.router.navigate(['home/']);
    //location.reload();
  }
}
