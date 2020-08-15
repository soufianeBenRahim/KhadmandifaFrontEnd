import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CvGlobale, Deplome, Experiance } from '../Model/CV';
import { CvServiceService } from '../_services/cv-service.service';


@Component({
  selector:'cv-component',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CVComponent implements OnInit {
constructor(private cvService : CvServiceService) { }
@Input() Cvg : CvGlobale;

@ViewChild('closebuttonAddDeplome',{static: false}) closebuttonAddDeplome;
@ViewChild('closebuttonAddExxperiance',{static: false}) closebuttonAddExxperiance;
  ngOnInit() {
    
  console.log('cv recuperee dans le composent CV '+this.Cvg);
  }
   onDeleteDeplome( id :string){
    this.cvService.delteDeplome(id).subscribe(data=>{
      console.log(' delete data :'+data);
      this.Cvg.deplomes.splice(this.Cvg.deplomes.indexOf(data));
    },erreur=>{
      console.log(' delete  erreur :'+erreur);
    });
  }

  onAddDeplomeToCV(deplome :Deplome){
    console.log('valeurs a ajouter '+deplome);

    this.cvService.addDeplomeToCV(deplome,this.Cvg.cv.id).subscribe(data=>{
      console.log('onAddDeplomeToCV data '+data);
      if(this.Cvg.deplomes==null){
        
        this.Cvg.deplomes=[];
      }
      this.Cvg.deplomes.push(data);
      this.closebuttonAddDeplome.nativeElement.click();
    },erreur=>{
      console.log('onAddDeplomeToCV erreur'+erreur);
    })
  }

  onDeleteExperiance(id :number){
    this.cvService.deleteEperiance(id).subscribe(data=>{
    console.log(data);
    this.Cvg.experiances.splice(this.Cvg.experiances.indexOf(data));
    },erruer=>{
    console.log(erruer);
    });
}
onAddExperianceToCV(experiance :Experiance){
  console.log('valeurs a ajouter '+experiance);
  console.log('id cv : '+this.Cvg.cv.id);
  this.cvService.addExperiance(experiance,this.Cvg.cv.id).subscribe(data=>{
  console.log('onAddDeplomeToCV data '+data);
  if(this.Cvg.experiances==null){
        
    this.Cvg.experiances=[];
  }
  this.Cvg.experiances.push(data);
  this.closebuttonAddExxperiance.nativeElement.click();
  },erreur=>{
    console.log('onAddDeplomeToCV erreur'+erreur);
  })
}
onDeleteCompitance(id){
  this.cvService.deleteCompitance(id).subscribe(data=>{
    console.log(data);
    this.Cvg.compitances.splice(this.Cvg.compitances.indexOf(data));
  },erruer=>{
    console.log(erruer);
  })
}
}
