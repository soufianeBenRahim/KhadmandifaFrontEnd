import { Component, OnInit, Input } from '@angular/core';
import {  Experiance } from '../Model/CV';
import { CvServiceService } from '../_services/cv-service.service';

@Component({
  selector: 'app-experiance',
  templateUrl: './experiance.component.html',
  styleUrls: ['./experiance.component.css']
})
export class ExperianceComponent implements OnInit {
  @Input()  experiances : Experiance[];
  @Input()  idCv : number;
  constructor(private cvService : CvServiceService) { }

  ngOnInit() {
  }
  onDeleteExperiance(id :number){
      this.cvService.deleteEperiance(id).subscribe(data=>{
      console.log(data);
      },erruer=>{
      console.log(erruer);
      });
  }
  onAddExperianceToCV(experiance :Experiance){
    console.log('valeurs a ajouter '+experiance);
    console.log('id cv : '+this.idCv);
    this.cvService.addExperiance(experiance,this.idCv).subscribe(data=>{
console.log('onAddDeplomeToCV data '+data);


    },erreur=>{
      console.log('onAddDeplomeToCV erreur'+erreur);
    })
  }
}
