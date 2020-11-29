import { Component, OnInit, Output,EventEmitter, Input, ViewChild } from '@angular/core';

import { Projet } from '../Model/Projet';
import { ProjectServiceService } from '../project-service.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})

export class UpdateProjectComponent implements OnInit {
  @ViewChild('closebuttonModofoerprojet',{static: false}) closebuttonModofoerprojet;
  constructor(private projetService : ProjectServiceService
    ,private tockeService:TokenStorageService) { }
  @Input() selectedProject:Projet;
  @Output() update: EventEmitter<Projet> = new EventEmitter();
  @Output() add: EventEmitter<Projet> = new EventEmitter();
  ngOnInit() {

  }
  onUpdateProject(project){
    this.selectedProject.description=project.description;
    this.selectedProject.detail=project.detail;
    console.log("projet envoiyee au update : "+project.detail);
    if(this.getModeInsert()==true){
      console.log("ajouer ");
      this.saveNewProjet(this.selectedProject)
    }else{
      console.log("modifier ");
      this.updateProjet(this.selectedProject)
    }
    this.closebuttonModofoerprojet.nativeElement.click();
  }
  getModeInsert(){
   
    if(this.selectedProject==undefined || this.selectedProject.id==undefined)
    return true
    else
    return false
  }
updateProjet(proj){
  console.log("projet envoiyee au update : "+proj);
  
  this.projetService.updateProjet(proj).subscribe(
    (result: Projet) => {
       if(result.id){
        console.log('succes') 
        this.update.emit(result);
       }
    },
    error => {
  console.log(error)
    }
);
}
  saveNewProjet(proj: Projet){
let iduser=this.tockeService.GetUserId();
    this.projetService.addProjet(proj,iduser).subscribe(
            (result: Projet) => {
               if(result.id){
                this.add.emit(result);
               }
               console.log(result)
            },
            error => {
               console.log(error)
            }
    );
  }
}
