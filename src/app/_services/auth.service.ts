import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {GestionarcredencialesService} from '../_services/gestionarcredenciales.service'
import { Region } from '../_models/region';
import { Producto } from '../_models/productos';
import { UserInterface } from '../_models/UserInterface';
import {Router} from '@angular/router';
import { getRandomString } from 'selenium-webdriver/safari';

@Injectable({
    providedIn: "root"
})
export class AuthService {
    constructor(
        private http: HttpClient,
        private gestioncredenciales:GestionarcredencialesService,
        private router: Router
        ) {}
        public u = "http://18.144.29.101:5000/";

    loginRe(user: string,password:string){
        let myheaders = new HttpHeaders();
        myheaders = myheaders.append("Authorization", "Basic " + btoa(user+":"+password));
        myheaders = myheaders.append("Content-Type", "application/x-www-form-urlencoded");
        console.log(myheaders)
        const httpOptions = {headers:myheaders};
        return this.http.get<any>(this.u + "/api/representante",httpOptions);
        //return this.http.get<any>("http://18.144.29.101:5000/api/test");
    }
    loginCli(user: string,password:string){
        let myheaders = new HttpHeaders();
        myheaders = myheaders.append("Authorization", "Basic " + btoa(user+":"+password));
        myheaders = myheaders.append("Content-Type", "application/x-www-form-urlencoded");
        console.log(myheaders)
        const httpOptions = {headers:myheaders};
        return this.http.get<any>(this.u + "/api/cliente",httpOptions);
    }
    registerRep(
        identificacion: number,
        nombre: string,
        grado:string,
        esdirector:string,
        type:string,
        username:string,
        correoelectronico: string,
        genero: string,
        fechaNacimiento: string,
        fechaContrato: string,
        telefonoContacto: string,
        direccion: string,
        region: number){
            let myheaders = new HttpHeaders();
            myheaders = myheaders.append("Authorization", "Basic " + this.gestioncredenciales.obtenerCredencialesUsuarioActual());
            myheaders = myheaders.append("Content-Type", "application/json");
            const httpOptions = {headers:myheaders};
            let rmp;
            if(this.gestioncredenciales.obtenerUsuarioActual().replace("uc","")){
                rmp = this.gestioncredenciales.obtenerUsuarioActual().replace("uc","");
            }else{
                rmp = this.gestioncredenciales.obtenerUsuarioActual().replace("u","");
            }
            const data = {
                "grado":grado,
                "genero":genero,
                "esdirector":esdirector,
                "nombre":nombre,
                "tipoid":type,
                "direccion":direccion,
                "usuario":username,
                "region":region,
                "fechacontrato":fechaContrato,
                "identificacion":identificacion,
                "fechanacimiento":fechaNacimiento,
                "correoelectronico":correoelectronico,
                "telefonocontacto":telefonoContacto
            }
            return this.http.post<any>( this.u + "/api/representante",data,httpOptions);
    }
    
    registerCli(
        cedula: number,
        tipo:string,
        nombre: string,
        apellido: string,
        telefono: number,
        direccion: string,
        ciudad: string,
        correoelectronico: string,
        username: string
    ){
        let myheaders = new HttpHeaders();
            myheaders = myheaders.append("Authorization", "Basic " + this.gestioncredenciales.obtenerCredencialesUsuarioActual());
            myheaders = myheaders.append("Content-Type", "application/json");
        const httpOptions = {headers:myheaders};
        let rp;
        if(this.gestioncredenciales.obtenerUsuarioActual().replace("uc","")){
            rp = this.gestioncredenciales.obtenerUsuarioActual().replace("uc","");
        }else{
            rp = this.gestioncredenciales.obtenerUsuarioActual().replace("u","");
        }
        const data = {
            "identificacion":cedula,
            "tipoid":tipo,
            "nombre":nombre,
            "apellido":apellido,
            "correoelectronico":correoelectronico,
            "telefono":telefono,
            "direccion":direccion,
            "ciudad":ciudad,
            "username":username
        }
        return this.http.post<any>(this.u + "/api/cliente",data,httpOptions);
    }

    getRegiones(){
        let myheaders = new HttpHeaders();
            myheaders = myheaders.append("Authorization", "Basic " + this.gestioncredenciales.obtenerCredencialesUsuarioActual());
            myheaders = myheaders.append("Content-Type", "application/json");
        const httpOptions = {headers:myheaders};
        return this.http.get<Region[]>(this.u+"/api/region",httpOptions)
    }

    getProductos(){
        let myheaders = new HttpHeaders();
            myheaders = myheaders.append("Authorization", "Basic " + this.gestioncredenciales.obtenerCredencialesUsuarioActual());
            myheaders = myheaders.append("Content-Type", "application/json");
        const httpOptions = {headers:myheaders};
        return this.http.get<Producto[]>(this.u + "/api/productoregion/"+this.gestioncredenciales.obtenerRegion(),httpOptions);
    }

    registarPedido(mododepago:string,pd){
        let myheaders = new HttpHeaders();
            myheaders = myheaders.append("Authorization", "Basic " + this.gestioncredenciales.obtenerCredencialesUsuarioActual());
            myheaders = myheaders.append("Content-Type", "application/json");
        const httpOptions = {headers:myheaders};
        const data = {
            "identificacion":this.gestioncredenciales.obtenerId(),
            "tipoid":this.gestioncredenciales.obtenerType(),
            "mododepago":mododepago,
            pd
        }
        return this.http.post<any>(this.u + "/api/pedido",data,httpOptions);
    }
    getComision(id:number){
        let myheaders = new HttpHeaders();
            myheaders = myheaders.append("Authorization", "Basic " + btoa("adminnatame:12345"));
            myheaders = myheaders.append("Content-Type", "application/json");
        const httpOptions = {headers:myheaders};
        return this.http.get<any>(this.u+"/api/comision/"+id,httpOptions);
    }
}