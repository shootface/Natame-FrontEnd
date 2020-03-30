import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GestionarcredencialesService {
    public shoopPro = [];
    constructor() { }
    guardarCredenciales(user,pass){
        let userData:any;
        userData = btoa(user + ':' + pass);
        localStorage.setItem('username',user);
        localStorage.setItem('currentUser', userData);
    }

    guardarType(type){
        localStorage.setItem('type',type);
    }

    guardarId(id){
        localStorage.setItem('id',id);
    }
    guardarItems(Pro){
        console.log('guardado');
        localStorage.setItem('Products',JSON.stringify(Pro))
        //this.shoopPro = Pro;
        //console.log('G',this.shoopPro)
    }
    obtenerItems(){
        return JSON.parse(localStorage.getItem('Products'))
    }
    obtenerId(){
        return localStorage.getItem('id');
    }
    obtenerType(){
        return localStorage.getItem('type');
    }
    obtenerUsuarioActual(){
        return localStorage.getItem('username');
    }

    obtenerCredencialesUsuarioActual(){
        return localStorage.getItem('currentUser');
    }

    borrarCredenciales(){
        localStorage.removeItem('username');
        localStorage.removeItem('currentUser');
    }

    obtenerRegion(){
        return localStorage.getItem('region')
    }

    setRegion(region:number) {
        localStorage.setItem('region',region.toString());
    }
}