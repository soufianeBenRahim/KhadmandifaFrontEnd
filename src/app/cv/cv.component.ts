import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CvServiceService } from '../_services/cv-service.service';
import { CV } from '../Model/CV';


@Component({
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CVComponent implements OnInit {
id :string;
  constructor(private route:ActivatedRoute,private router:Router,private cvServic: CvServiceService) { }
cv : CV;
  ngOnInit() {
    this.id=this.route.snapshot.params.id;
    console.log('id cv selectionner a partir de menue principale :'+this.id);
    this.cvServic.getCVByID(this.id).subscribe(data=>{
      this.cv=data;
    },erreur=>{
      console.log(erreur);
    });
  }

}
