import { Component, OnInit, Output, Input, ViewChild } from '@angular/core';
import { Projet } from '../Model/Projet';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})

export class UpdateProjectComponent implements OnInit {
  @ViewChild('closebuttonModofoerprojet',{static: false}) closebuttonModofoerprojet;
  constructor() { }
  @Input() localID:'myModalProjet';
  @Input() selectedProject:Projet;
  
  ngOnInit() {

  }
  onUpdateProject(project){
    if(this.selectedProject==undefined){
      console.log("ajouer ");
    }else{
      console.log("modifier ");
    }
    this.closebuttonModofoerprojet.nativeElement.click();
  }
}
