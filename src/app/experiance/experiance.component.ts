import { Component, OnInit, Input } from '@angular/core';
import { CV } from '../Model/CV';
import { CvServiceService } from '../_services/cv-service.service';

@Component({
  selector: 'app-experiance',
  templateUrl: './experiance.component.html',
  styleUrls: ['./experiance.component.css']
})
export class ExperianceComponent implements OnInit {
  @Input()  experiances : any;
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
}
