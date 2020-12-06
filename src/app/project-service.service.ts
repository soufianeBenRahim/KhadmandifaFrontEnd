import { Injectable } from '@angular/core';
import { HttpHeaders,  HttpClient } from '@angular/common/http';
import { Projet } from './Model/Projet';
import { Observable } from 'rxjs';
import { DemandeRealisation } from './Model/DemandeRealisation';

const AUTH_API = 'http://localhost:8080/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class ProjectServiceService {
  addDemmandeToProjet(fdemande: DemandeRealisation, idProjet: any,iduser:any) {
    return this.http.post<DemandeRealisation>(AUTH_API+'addDemandeToProject?idProjet='+idProjet+'&idUser='+iduser,fdemande);
  }
  getdemandeByid(id: any) {
    return this.http.get<DemandeRealisation>(AUTH_API+'getdemandeByidr?id='+id);
  }
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

  acceptDemandeInProjet(idprojet:any,iddemmande:any) :  any{
    return this.http.post(AUTH_API+'acceptDemandeInProjet?idprojet='+idprojet+'&iddemmande='+iddemmande,null);
  }
}
