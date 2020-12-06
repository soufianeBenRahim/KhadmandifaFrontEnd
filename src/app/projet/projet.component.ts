import { Component, OnInit, Input } from '@angular/core';
import {  Projet } from '../Model/Projet';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { ProjectServiceService } from '../project-service.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { DemandeRealisation } from '../Model/DemandeRealisation';
import { ThrowStmt } from '@angular/compiler';



@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {
 
   @Input()  projects: Projet[];

  
  public curentProjet=new Projet();
  isLogedUserProfile:boolean=false;
  constructor(private activateRoute:ActivatedRoute,
    private userService: UserService,
    private router:Router,
    private  projectservice:ProjectServiceService,
    private tockeService:TokenStorageService) { }
    _idUser : number=undefined;
    _modeinsert="liste"
    @Input()  set modeinsert(valeur:string){
      this._modeinsert=valeur;
    }
    get modeinsert() : string{
      return this._modeinsert;
    };
    @Input() set iduser(valeur: number) {
      this._idUser =valeur;
      this.onIdUserChange(valeur);
    }
    get iduser(): number {
      return this._idUser;
    }
    typeuser : string;
  ngOnInit() {
    this.onIdUserChange(this._idUser);
    this.typeuser=this.tockeService.getLogedtypeuser();
  }
  onIdUserChange(id:number){
    if(id){
      this.isLogedUserProfile=this.tockeService.isLogedUser(id);

      this.projectservice.GetProjectsFromUser(id).subscribe(data => {
        console.log('projet de cv ' + data)
        this.projects = data;
      }, err => {
        console.log(err);
      });
    }else{
      this.userService.getPublicContent().subscribe(data=>{
        console.log("public content "+data);
        this.projects=data;
        },erruer=>{
        console.log(erruer);
        })
    }
  }
  onclickModifProject(project){
    
    this.curentProjet=Object.assign({}, project);
    console.log(this.curentProjet)
   // this.router.navigate(['/project','fiche']);
  }
  onclickAjoutProject(){
    this.curentProjet= new Projet();
    console.log(this.curentProjet)

   // this.router.navigate(['/project','fiche']);
  }
  oncanelpdate(){
    this.router.navigate(['/project','liste']);
  }
  onUpdate(projet){
    console.log(" projet a Modifier par le fils :"+projet)
    let index : number = 0; 
    if(this.projects && this.projects.length > 0){
        this.projects.forEach(element => {
            if(element.id == projet.id){
                this.projects.splice(index, 1, projet);
        
            }
            index++;
        });
    }
  } 


  onAdd(projet){
    console.log(" projet a jouter par le fils :"+projet)
    this.projects.push(projet)
  };

  onclickUser(acceptedDemande,projet){
    let iduser=this.tockeService.GetUserId();
    if(iduser && this.typeuser==='EUR' && iduser===projet.emploiyeur.id 
    && !projet.acceptedDemande){
      this.router.navigate(['/profile',acceptedDemande.demandeur.id,'accept',projet.id,acceptedDemande.id]);
    }else{
      this.router.navigate(['/profile',acceptedDemande.demandeur.id,'view']);
    }

  }

  onpostulationProjet(p){
this.router.navigate(['demande/add',p.id])
  }

  public showDemandeInProject(p: Projet) : boolean{
    return this.isLogedUserProfile===false && this.typeuser==='EE' 
    && this.isConnctedUserInDemmande(p.demandeRealisations)!==true
    && !p.acceptedDemande
  }
  public isConnctedUserInDemmande(demandes :DemandeRealisation[]) : boolean{
    if(!demandes) return false;
    let id_user = this.tockeService.GetUserId();
    for (let index = 0; index < demandes.length; index++) {
      const element = demandes[index];
      if(id_user==element.demandeur.id) 
      return true;
    }

    return false;
  }
}
