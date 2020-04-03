import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { log } from 'util';

const API_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  GetUserById(id : any): any {
    return this.http.get(API_URL+"GetUserByID?id="+id, { responseType: 'text' });
  }

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    console.log(API_URL+"PROJETs");
    return this.http.get(API_URL+"projets", { responseType: 'text' });
  }

  getUserByName(name: String): Observable<any> {
    return this.http.get(API_URL + 'GetUserByName?name='+name, { responseType: 'text' });
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
  RegisterEntrepronneur(data): Observable<any> {
    console.log(data);
    return this.http.post(API_URL + 'register',data.value, { observe: 'response' });
  }
  
}