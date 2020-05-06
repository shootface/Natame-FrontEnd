import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {GestionarcredencialesService} from '../_services/gestionarcredenciales.service'
import { Region } from '../_models/region';
import { Producto } from '../_models/productos';

import { UserInterface } from '../_models/UserInterface';
import {Router} from '@angular/router';
import { getRandomString } from 'selenium-webdriver/safari';
import { resolve } from 'url';

@Injectable({
    providedIn: "root"
})
export class AuthService {
    constructor(
        private http: HttpClient,
        private gestioncredenciales:GestionarcredencialesService,
        private router: Router
        ) {}
        public u = "http://18.144.29.101:5000";
        public temp = "http://localhost:3000"; 

        async productos(){
        let myheaders = new HttpHeaders();
        myheaders = myheaders.append("Authorization", "Basic " + this.gestioncredenciales.obtenerCredencialesUsuarioActual());
        myheaders = myheaders.append("Content-Type", "application/json");
        const httpOptions = {headers:myheaders};
        return await this.http.get<any>(this.temp + "/productos",httpOptions).toPromise();
    }
    calificarPedido(id: string,calificacion: string){
        let myheaders = new HttpHeaders();
        myheaders = myheaders.append("Authorization", "Basic " + this.gestioncredenciales.obtenerCredencialesUsuarioActual());
        myheaders = myheaders.append("Content-Type", "application/json");
        const httpOptions = {headers:myheaders};
        console.log('CALIFICACION',myheaders);
        const data = {
            "temp":id,
        }
        return this.http.post<any>(this.u +"/api/pedido/"+id+"/"+calificacion,data,httpOptions);
    }
    pagar(id: string){
        let myheaders = new HttpHeaders();
            myheaders = myheaders.append("Authorization", "Basic " + this.gestioncredenciales.obtenerCredencialesUsuarioActual());
            myheaders = myheaders.append("Content-Type", "application/json");
        const httpOptions = {headers:myheaders};
        const data = {
            "temp":id,
        }
        return this.http.post<any>( this.u + "/api/pagos/"+id,data,httpOptions);
    }

    getPedidos(){
        let myheaders = new HttpHeaders();
        myheaders = myheaders.append("Authorization", "Basic " + this.gestioncredenciales.obtenerCredencialesUsuarioActual());
        myheaders = myheaders.append("Content-Type", "application/json");
        const httpOptions = {headers:myheaders};
        console.log(myheaders);
        return this.http.get<any>(this.u + "/api/pedido",httpOptions);
    }
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
                "identificacion":identificacion,
                "tipoid":type,
                "nombre":nombre,
                "correoelectronico":correoelectronico,
                "genero":genero,
                "fechacontrato":fechaContrato,
                "direccion":direccion,
                "fechanacimiento":fechaNacimiento,
                "telefonocontacto":telefonoContacto,
                "esdirector":esdirector,
                "grado":grado,
                "region":region,
                "usuario":username
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
        return this.http.get<Region[]>(this.u+"/api/region",httpOptions);
    }
    
    async getProductos(){
        let myheaders = new HttpHeaders();
            myheaders = myheaders.append("Authorization", "Basic " + this.gestioncredenciales.obtenerCredencialesUsuarioActual());
            myheaders = myheaders.append("Content-Type", "application/json");
        const httpOptions = {headers:myheaders};
        return await this.http.get<Producto[]>(this.u + "/api/productoregion/"+this.gestioncredenciales.obtenerRegion(),httpOptions).toPromise();
    }

    registarPedido(mododepago:string,cli,pd){
        console.log('cli : ',cli[0]);
        let myheaders = new HttpHeaders();
            myheaders = myheaders.append("Authorization", "Basic " + this.gestioncredenciales.obtenerCredencialesUsuarioActual());
            myheaders = myheaders.append("Content-Type", "application/json");
        const httpOptions = {headers:myheaders};
        const data = {
            "identificacion":cli[0].identificacion,
            "tipoid":cli[0].tipoid,
            "mododepago":mododepago,
            pd,
            "fechapedido": new Date().toISOString().slice(0, 19).replace('T', ' ')
        }
        console.log(data);
        return this.http.post<any>(this.u + "/api/pedido",data,httpOptions);
    }

    getComision(id:number){
        let myheaders = new HttpHeaders();
            myheaders = myheaders.append("Authorization", "Basic " + this.gestioncredenciales.obtenerCredencialesUsuarioActual());
            myheaders = myheaders.append("Content-Type", "application/json");
        const httpOptions = {headers:myheaders};
        return this.http.get<any>(this.u+"/api/comision/"+id,httpOptions);
    }

    getClientes(){
        let myheaders = new HttpHeaders();
        myheaders = myheaders.append("Authorization", "Basic " + this.gestioncredenciales.obtenerCredencialesUsuarioActual());
        myheaders = myheaders.append("Content-Type", "application/json");
        const httpOptions = {headers:myheaders};
        return this.http.get<any>(this.u + "/api/clienterv",httpOptions);
    }
}