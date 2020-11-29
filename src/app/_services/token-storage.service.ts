import { Injectable } from '@angular/core';
import { AppUser } from '../Model/User';
//import {JwtHelper} from 'angular2-jwt';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  getLogedtypeuser(): string {
    let user=JSON.parse(sessionStorage.getItem(USER_KEY)) as AppUser;
    if(user==undefined){
      undefined;
    }
    return user[0].typeuser;
  }
  private roles:Array<any>=null;
  constructor() { }

  clear() {
    window.sessionStorage.clear();
    this.roles=null;
  }
  getRolsFromJwtTocken(){
    let jwt=sessionStorage.getItem(TOKEN_KEY);
    if(jwt==null) 
    {
      return null;
    }
    else
    {
 //     let jwthelper=new JwtHelper();
  //    return this.roles=jwthelper.decodeToken(jwt).roles;
    } 
  };
  
  isAdmin(){
    if(this.roles==null) 
    {
      return false;
    }
    else 
    {

      this.roles.forEach(element => {
        if(element.authority=='ADMIN')
        return true;
      });
      return false;
    }
  }
  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): any {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, user);
  }

  public getUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY)) as AppUser;
  }

  public GetUserId(): number{
    let user=JSON.parse(sessionStorage.getItem(USER_KEY)) as AppUser;
    if(user==undefined){
      undefined;
    }
    return user[0].id;
  }
  isTockenExpired(){
    let jwt=sessionStorage.getItem(TOKEN_KEY);
    if(jwt==null)
    {
      return false;
    }
    else{
   //   let jwthelper=new JwtHelper();
    //  return jwthelper.isTokenExpired(jwt);
    }
  }
  isLogedUser(id: number) : boolean{
    let user=JSON.parse(sessionStorage.getItem(USER_KEY)) as AppUser;
    if(user==undefined){
      return false;
    }else{
      if(user[0].id==id){
        return true;
      }
      else {
        return false;
      }
    }
  }
}