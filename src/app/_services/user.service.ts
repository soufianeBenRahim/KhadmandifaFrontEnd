import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppUser } from '../Model/User';
import { Projet } from '../Model/Projet';


const API_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  GetUserById(id : any) {
    return this.http.get<AppUser>(API_URL+"GetUserByID?id="+id);
  }

  constructor(private http: HttpClient) { }

  getPublicContent() : Observable<Projet[]>{
    console.log(API_URL+"/projets");
    return this.http.get<Projet[]>(API_URL+"projets");
  }

  getUserByName(name: String) {
    console.log("user service call getUserByName id name: "+name)
    return this.http.get(API_URL + 'GetUserByName?name='+name,{ responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }
  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'users', { responseType: 'text' });
  }
  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
 
}