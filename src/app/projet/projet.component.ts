import { Component, OnInit, Input } from '@angular/core';
import { Projet } from '../Model/Projet';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { ProjectServiceService } from '../project-service.service';
import { TokenStorageService } from '../_services/token-storage.service';



@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {
 
   @Input()  projects: Projet[];

  
  public curentProjet=new Projet();
  isLogedUserProfile:boolean=false;
  constructor(private route:ActivatedRoute,
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

  onclickUser(acceptedDemande){
    this.router.navigate(['/profile',acceptedDemande.demandeur.id]);
  }
}
