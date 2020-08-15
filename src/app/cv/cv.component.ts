import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CvGlobale, Deplome } from '../Model/CV';
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
  ngOnInit() {
    
  console.log('cv recuperee dans le composent CV '+this.Cvg);
  }
   onDeleteDeplome( id :string){
    this.cvService.delteDeplome(id).subscribe(data=>{
      console.log(' delete data :'+data);
      this.Cvg.deplomes.splice(this.Cvg.deplomes.indexOf(data.body));
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
}
