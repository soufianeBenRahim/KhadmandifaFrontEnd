import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from '../_services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { CvGlobale } from '../Model/CV';
import { CvServiceService } from '../_services/cv-service.service';
import { AppUser } from '../Model/User';
import { Projet } from '../Model/Projet';
import { ProjectServiceService } from '../project-service.service';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  CVgs: CvGlobale[];
  selectedCVGlobale: CvGlobale;
  SelectedUser: AppUser;
  projects: Projet[];
  isLogedUserProfile: boolean = false;
  modeInsetCV: boolean = undefined;
  _typeappel: string;
  _idProjet: any;
  _iddemmande: any;
  constructor(
    private route: ActivatedRoute,
    private userserv: UserService,
    private cvService: CvServiceService,
    private tockenservice: TokenStorageService,
    private projetService: ProjectServiceService,
    private router:Router,
  ) { }

  ngOnInit() {

    this.route.params.subscribe(
      params => {
        if (params.typeappel) {
          this._typeappel = params.typeappel;
        }
        if (params.idProjet) {
          this._idProjet = params.idProjet;
        }
        if (params.iddemmande) {
          this._iddemmande = params.iddemmande;
        }
        console.log("param id" + params);
        this.userserv.GetUserById(params.id).subscribe(
          data => {
            console.log('GetUserById in frofile compenete ' + data)

            this.SelectedUser = data;

            this.isLogedUserProfile = this.tockenservice.isLogedUser((params.id));

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

  onDeleteCV(id) {
    this.cvService.DeleteCvByid(id).subscribe(data => {
      console.log(data)
      let i = 0;
      let index = 0;
      if (this.CVgs && this.CVgs.length > 1) {
        this.CVgs.forEach(cvelement => {
          if (cvelement.cv.id = id) {
            i = index;
          }
          index++;
        });
      }
      this.CVgs.splice(i);
    }, err => {
      console.log(err);
    });
    this.selectedCVGlobale = undefined;
  }
  onAppelAddCV() {
    this.modeInsetCV = true;
    this.selectedCVGlobale = undefined;
  }

  onAppelUpdateCV() {
    this.modeInsetCV = false;
  }

  onSelectedCvCahge(c: CvGlobale) {
    this.selectedCVGlobale = c;
    console.log("cv selectionner dans la page profile" + this.selectedCVGlobale);
  }

  onAddCv(cv) {
    let cvg1 = new CvGlobale();
    cvg1.cv = cv;
    if (this.CVgs) {
      this.CVgs = [cvg1, ...this.CVgs]
    } else {
      this.CVgs = [cvg1]
    }
  }
  onUpdateCv(cv) {
    if (this.CVgs != null && this.CVgs.length > 0) {
      this.CVgs.forEach(element => {
        if (element.cv.id == cv.id) {
          element.cv = cv;
        }
      });
    }
  }
  onacceptuser() {
    this.projetService.acceptDemandeInProjet(this._idProjet, this._iddemmande)
      .subscribe(data => {
        this.router.navigate(['home']);
      }, erreur => {
        console.log(erreur)
      })
  }

}

