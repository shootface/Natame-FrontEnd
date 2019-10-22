import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { NgForm } from '@angular/forms';
import { Cliente } from '../_models/cliente';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.css']
})
export class RegistrarClienteComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private router: Router
  ) {
    
  }
  public isError = false;
  public msgError = '';
  private cliente: Cliente = {
    cedula: null,
    nombrecliente: null,
    apellidocliente: null,
    telefonoContacto: null,
    direccion: null,
    ciudad: null,
    correoelectronico: null,
    type:null,
    username: null
  };

  ngOnInit() {
  }
  onRegister(form: NgForm): void {
    if (form.valid) {
      this.authService
        .registerCli(
          this.cliente.cedula,
          this.cliente.type,
          this.cliente.nombrecliente,
          this.cliente.apellidocliente,
          this.cliente.telefonoContacto,
          this.cliente.direccion,
          this.cliente.ciudad,
          this.cliente.correoelectronico,
          this.cliente.username
          )
        .subscribe(
          response => {
            console.log('Success: ', response);
            this.router.navigate(['login']);
          },
          error => {
            alert(error['error']['text']);
          }
        );
    }
  }
}
