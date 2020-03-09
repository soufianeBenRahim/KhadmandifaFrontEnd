import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(data) {
    console.log(data);
    return this.http.post(AUTH_API + 'login',data,{observe:'response'} );
  }

  register(user): Observable<any> {
    console.log(user);
    return this.http.post(AUTH_API + 'register', user,httpOptions);
  }
}
