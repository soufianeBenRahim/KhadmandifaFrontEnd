import { Component, OnInit, Input } from '@angular/core';

import { TokenStorageService } from '../_services/token-storage.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { UserService } from '../_services/user.service';
import { CV, CvGlobale } from '../Model/CV';
import { CvServiceService } from '../_services/cv-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  CVgs :CvGlobale[];
  selectedCV :CvGlobale;

  constructor(private router:Router,private route:ActivatedRoute,private tokenStorageService: TokenStorageService,private userserv : UserService,private cvService : CvServiceService) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      console.log("param id"+params)
      this.cvService.GetCVFromUser(params.id).subscribe(data=>{
        console.log(data)
        this.CVgs=data;
      },err=>{
        console.log(err);
      })
    });
    }
    onSelectedCvCahge(c:CvGlobale){
      this.selectedCV=c;
      console.log("cv selectionner dans la page profile"+this.selectedCV);
    }

}

