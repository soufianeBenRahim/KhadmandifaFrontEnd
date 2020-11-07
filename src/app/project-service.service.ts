import { Injectable } from '@angular/core';
import { HttpHeaders,  HttpClient } from '@angular/common/http';
import { Projet } from './Model/Projet';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class ProjectServiceService {
  GetProjectsFromUser(id: any): Observable<Projet[]> {
    return this.http.get<Projet[]>(AUTH_API+'getprojectsuser?id='+id);
  }

  constructor(private http:HttpClient) { }

  addProjet(proj:Projet, id:number): Observable<Projet>{
    return this.http.post<Projet>(AUTH_API+'addprojet?iduser='+id,proj);
  }
  updateProjet(proj:Projet): Observable<Projet>{
    return this.http.put<Projet>(AUTH_API+'updateProjet',proj);
  }
}
