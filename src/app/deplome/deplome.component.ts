import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CvServiceService } from '../_services/cv-service.service';
import {Deplome} from '../Model/CV'

@Component({
  selector: 'app-deplome',
  templateUrl: './deplome.component.html',
  styleUrls: ['./deplome.component.css']
})
export class DeplomeComponent implements OnInit {
  @Input()  idCv;
  diplomes: Deplome[];
  constructor(private router:Router,private cvService : CvServiceService) { }

  ngOnInit() {
    this.cvService.getDeplomesFromCv(this.idCv)
    .subscribe(
      data=>{
        console.log('les deplommes a afficher '+data)
        console.log('les deplommes a afficher '+this.idCv)
        this.diplomes=data;

    },
    erreur=>{
      console.log(erreur);
    }
    )
  }
  onDeleteDeplome( id :string){
    this.cvService.delteDeplome(id).subscribe(data=>{
console.log(' delete data :'+data);
location.reload(true);
    },erreur=>{
      console.log(' delete  erreur :'+erreur);
    });
  }

  onAddDeplomeToCV(deplome :any){
    console.log('valeurs a ajouter '+deplome);
    console.log('id cv : '+this.idCv);
    this.cvService.addDeplomeToCV(deplome,this.idCv).subscribe(data=>{
console.log('onAddDeplomeToCV data '+data);


    },erreur=>{
      console.log('onAddDeplomeToCV erreur'+erreur);
    })
  }
}
