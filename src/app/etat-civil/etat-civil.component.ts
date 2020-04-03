import { Component, OnInit, Input } from '@angular/core';
import { CvServiceService } from '../_services/cv-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CV } from '../Model/CV';

@Component({
  selector: 'app-etat-civil',
  templateUrl: './etat-civil.component.html',
  styleUrls: ['./etat-civil.component.css']
})
export class EtatCivilComponent implements OnInit {
  @Input() etatCevile : CV;
  @Input() idCv;
  constructor(private  cvservice : CvServiceService,private rout : ActivatedRoute) { }

  ngOnInit() {
    console.log('idCv updatee :'+this.etatCevile);
  }
  onUpdateCv(data:any){
    console.log('data etatcevil to update'+ data)
    this.cvservice.UpdateCV(this.idCv,data).subscribe(
      data => {
             console.log('idCv updatee :'+this.etatCevile);
      },
      err => {
        this.etatCevile = err.error;
      }
    );
  }

}
