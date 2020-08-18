import { Injectable } from '@angular/core';
import { HttpHeaders,  HttpClient } from '@angular/common/http';
import { Projet } from './Model/Projet';

const AUTH_API = 'http://localhost:8080/projects/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class ProjectServiceService {
  GetProjectsFromUser(id: any) {
    return this.http.get<Projet[]>(AUTH_API+'getprojectsuser?id='+id);
  }

  constructor(private http:HttpClient) { }
}
