import { Component, OnInit, Input } from '@angular/core';
import { Projet } from '../Model/Projet';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services/user.service';



@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {
 
  @Input()  projects: Projet[];

  curentProjet:Projet;
  constructor(private route:ActivatedRoute,
    private userService: UserService,
    private router:Router) { }
  modeinsert="liste";
  idFormModal='mayModallclaProet';
  ngOnInit() {
      this.route.params.subscribe(params=>{
        let modelocale=params['mode'];
 
        if(modelocale===undefined){ 
          this.modeinsert="liste";
          
        }else{
          this.modeinsert=modelocale;
        }
        if(this.projects===undefined){
          this.userService.getPublicContent().subscribe(data=>{
            console.log("public content "+data);
            this.projects=data;
            },erruer=>{
            console.log(erruer);
            })
        }
         console.log("param mode changed "+params['mode']);
      },erruer=>{
        console.log(erruer)
      });
  }
  onclickModifProject(project){
    this.curentProjet=project;
   // this.router.navigate(['/project','fiche']);
  }
  onclickAjoutProject(){
    this.curentProjet= undefined;
   // this.router.navigate(['/project','fiche']);
  }
  oncanelpdate(){
    this.router.navigate(['/project','liste']);
  }
}
