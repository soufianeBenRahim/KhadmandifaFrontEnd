import { Component, OnInit, Input } from '@angular/core';
import { CvServiceService } from '../_services/cv-service.service';
import { Compitance } from '../Model/CV';

@Component({
  selector: 'app-compitance',
  templateUrl: './compitance.component.html',
  styleUrls: ['./compitance.component.css']
})
export class CompitanceComponent implements OnInit {
@Input() idCv:number;
compitances: Compitance[];
  constructor(private cvService : CvServiceService) { }

  ngOnInit() {
    this.cvService.getCompitancesFromCV(this.idCv).subscribe(data=>{
this.compitances=data;
    },erreur=>{
console.log(erreur);
    })

  }
  onDeleteCompitance(id){
    this.cvService.deleteCompitance(id).subscribe(data=>{
      console.log(data);
    },erruer=>{
      console.log(erruer);
    })
  }

}
