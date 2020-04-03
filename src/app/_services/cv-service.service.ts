import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,Subject  } from 'rxjs';
import { CV, Deplome } from '../Model/CV';

const AUTH_API = 'http://localhost:8080/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class CvServiceService {
  getDeplomesFromCv(idCv: any) {
    return this.http.get<Deplome[]>(AUTH_API+'CVs/'+idCv+'/deplomes',httpOptions);
  }
  deleteEperiance(id: number) {
    return this.http.delete(AUTH_API+'CVs/Eperiance/'+id+'/delete',{observe : 'response'});
  }
  addDeplomeToCV(deplome: Deplome, idCv: any) {
    return this.http.post(AUTH_API+'CVs/adddeplome?id='+idCv,deplome,{ observe: 'response' });
  }
  delteDeplome(id: string) {
    return this.http.delete(AUTH_API+'CVs/deplomes/'+id+'/delete',{observe : 'response'});
  }

  getCVByID(idCv: string) {
    return this.http.get<CV>(AUTH_API+'CVs/'+idCv,httpOptions);
  }
  GetCVFromUser(id:number){
    return this.http.get<CV[]>(AUTH_API+"CVs/CVsUser?id="+id.toString());
  }

  UpdateCV(id:number,cv:any){
    return this.http.put(AUTH_API+"CVs/update/"+id,cv);
  }

  constructor(private http : HttpClient) { }
}
