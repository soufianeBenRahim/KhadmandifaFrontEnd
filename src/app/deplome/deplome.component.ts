import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { CvServiceService } from '../_services/cv-service.service';
import {Deplome} from '../Model/CV'

@Component({
  selector: 'app-deplome',
  templateUrl: './deplome.component.html',
  styleUrls: ['./deplome.component.css']
})
export class DeplomeComponent implements OnInit {
  @Input()  diplomes: Deplome[];
  @Input()  idCV: string;
  @ViewChild('closebutton',{static: false}) closebutton;
  constructor(private router:Router,private cvService : CvServiceService) { }

  ngOnInit() {
  
  }
  onDeleteDeplome( id :string){
    this.cvService.delteDeplome(id).subscribe(data=>{
      console.log(' delete data :'+data);
      this.diplomes.splice(this.diplomes.indexOf(data.body));
    },erreur=>{
      console.log(' delete  erreur :'+erreur);
    });
  }

  onAddDeplomeToCV(deplome :Deplome){
    console.log('valeurs a ajouter '+deplome);

    this.cvService.addDeplomeToCV(deplome,this.idCV).subscribe(data=>{
      console.log('onAddDeplomeToCV data '+data);
      if(this.diplomes==null){
        this.diplomes=[];
      }
      this.diplomes.push(data.body);
      this.closebutton.nativeElement.click();
    },erreur=>{
      console.log('onAddDeplomeToCV erreur'+erreur);
    })
  }
}
