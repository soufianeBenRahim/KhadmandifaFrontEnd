import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,Subject  } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const AUTH_API = 'http://localhost:8080/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    ISConnected() {
        const tocken=this.tokenStorageService.getToken();
        return !!tocken;
    }

  logOut() {   
     this.tokenStorageService.signOut();
     this.clearIsConnectedObservabel();
  }

   constructor(private http: HttpClient,private tokenStorageService:TokenStorageService) { }
   private IsconnectedSubject = new Subject<any>();

    sendIsConnectedObservabel() {
        this.IsconnectedSubject.next({ text: "connected" });
    }

    clearIsConnectedObservabel() {
        this.IsconnectedSubject.next({ text: "desconected" });
    }

    getIsConnectedObservabel(): Observable<any> {
        return this.IsconnectedSubject.asObservable();
    }
  login(data) {
    console.log(data);
    return this.http.post(AUTH_API + 'login',data,{observe:'response'} );
  }

  register(user): Observable<any> {
    console.log(user);
    return this.http.post(AUTH_API + 'register', user);
  }
}
