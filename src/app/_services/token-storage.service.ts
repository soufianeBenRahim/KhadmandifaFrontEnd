import { Injectable } from '@angular/core';
//import {JwtHelper} from 'angular2-jwt';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
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

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
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
}