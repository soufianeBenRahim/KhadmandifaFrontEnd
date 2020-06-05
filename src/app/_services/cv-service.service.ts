import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,Subject  } from 'rxjs';
import { CV, Deplome, Compitance, Experiance, CvGlobale } from '../Model/CV';

const AUTH_API = 'http://localhost:8080/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class CvServiceService {
  addExperiance(experiance: Experiance, idCv: number) {
    return this.http.post(AUTH_API+'CVs/adddExperiance?id='+idCv,experiance,{ observe: 'response' });
  }
  deleteCompitance(id: any) {
    return this.http.delete(AUTH_API+'CVs/compitances/'+id+'/delete');
  }


  deleteEperiance(id: number) {
    return this.http.delete(AUTH_API+'CVs/Eperiance/'+id+'/delete',{observe : 'response'});
  }
  addDeplomeToCV(deplome: Deplome, idCv: any) {
    return this.http.put<Deplome>(AUTH_API+'CVs/adddeplome?id='+idCv,deplome,{ observe: 'response' });
  }
  delteDeplome(id: string) {
    return this.http.delete<Deplome>(AUTH_API+'CVs/deplomes/'+id+'/delete',{observe : 'response'});
  }

  getCVByID(idCv: string) {
    return this.http.get<CV>(AUTH_API+'CVs/'+idCv,httpOptions);
  }
  GetCVFromUser(id:string){
    return this.http.get<CvGlobale[]>(AUTH_API+"CVs/CVsUser?id="+id);
  }

  UpdateCV(id:number,cv:any){
    return this.http.put(AUTH_API+"CVs/update/"+id,cv);
  }

  constructor(private http : HttpClient) { }
}
