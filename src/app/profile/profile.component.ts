import { Component, OnInit, Input } from '@angular/core';

import { TokenStorageService } from '../_services/token-storage.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { UserService } from '../_services/user.service';
import { CV, CvGlobale } from '../Model/CV';
import { CvServiceService } from '../_services/cv-service.service';
import { AppUser } from '../Model/User';
import { ProjectServiceService } from '../project-service.service';
import { Projet } from '../Model/Projet';
import { element } from 'protractor';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  CVgs: CvGlobale[];
  selectedCV: CvGlobale;
  SelectedUser: AppUser;
  projects: Projet[];

  constructor(
    private route: ActivatedRoute,
    private userserv: UserService,
    private cvService: CvServiceService,
    private projectservice: ProjectServiceService
  ) { }

  ngOnInit() {

    this.route.params.subscribe(
      params => {
        console.log("param id" + params);

        this.userserv.GetUserById(params.id).subscribe(
          data => {
            console.log('GetUserById in frofile compenete ' + data)

            this.SelectedUser = data;

            this.cvService.GetCVFromUser(params.id).subscribe(data => {
              console.log(data)
              this.CVgs = data;
            }, err => {
              console.log(err);
            });
            console.log('demmande des proets pour le cv');
          

          }, err => {
            console.log(err);
          }
        );
      }, erruer => {
        console.log(erruer)
      }
    )
  }


  onSelectedCvCahge(c: CvGlobale) {
    this.selectedCV = c;

    console.log("cv selectionner dans la page profile" + this.selectedCV);
  }

  onAddCv(cv) {
    let cvg1 = new CvGlobale();
    cvg1.cv = cv;
    this.CVgs = [cvg1, ...this.CVgs]
  }
  onUpdateCv(cv) {
    if (this.CVgs != null && this.CVgs.length > 0) {
      let index = 1;
      this.CVgs.forEach(element => {
        if (element.cv.id == cv.id) {
          element.cv = cv;
        }
      });
    }
  }

}

