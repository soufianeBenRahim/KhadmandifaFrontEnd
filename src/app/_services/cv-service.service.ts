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
  DeleteCvByid(id: string) {
    return this.http.delete<CV>(AUTH_API+'CVs/'+id+'/delete');
  }
  addCv(selectedCv: CV,idUser :number ) :Observable<CV>{
    return this.http.post<CV>(AUTH_API+'CVs/createCV?idUser='+idUser,selectedCv);
  }
  addCompitance(compitance: Compitance, idCv: number) {
    return this.http.post<Compitance>(AUTH_API+'CVs/addCompmitance?idCV='+idCv.toString(),compitance);
  }
  addExperiance(experiance: Experiance, idCv: number) {
    return this.http.post<Experiance>(AUTH_API+'CVs/adddExperiance?id='+idCv.toString(),experiance);
  }
  deleteCompitance(id: any) {
    return this.http.delete<Compitance>(AUTH_API+'CVs/compitances/'+id+'/delete');
  }


  deleteEperiance(id: number) {
    return this.http.delete<Experiance>(AUTH_API+'CVs/Eperiance/'+id+'/delete');
  }
  addDeplomeToCV(deplome: Deplome, idCv: any) {
    console.log(' parametre idcv : '+idCv)
    console.log(' parametre deplome : '+deplome)
    return this.http.post<Deplome>(AUTH_API+'CVs/adddeplome?id='+idCv.toString(),deplome);
  }
  delteDeplome(id: string) {
    return this.http.delete<Deplome>(AUTH_API+'CVs/deplomes/'+id+'/delete');
  }

  getCVByID(idCv: string) {
    return this.http.get<CV>(AUTH_API+'CVs/'+idCv,httpOptions);
  }
  GetCVFromUser(id:string){
    return this.http.get<CvGlobale[]>(AUTH_API+"CVs/CVsUser?id="+id);
  }

  UpdateCV(id:number,cv:any) :Observable<CV> {
    return this.http.put<CV>(AUTH_API+"CVs/update/"+id,cv);
  }

  constructor(private http : HttpClient) { }
}
