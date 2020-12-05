import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { error } from 'protractor';
import { CvGlobale } from '../Model/CV';
import { DemandeRealisation } from '../Model/Projet';
import { ProjectServiceService } from '../project-service.service';
import { CvServiceService } from '../_services/cv-service.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-update-demande-realisation',
  templateUrl: './update-demande-realisation.component.html',
  styleUrls: ['./update-demande-realisation.component.css']
})
export class UpdateDemandeRealisationComponent implements OnInit {

  constructor(private cvService: CvServiceService,
    private tockeService: TokenStorageService,
    private route: ActivatedRoute,
    private projectservice: ProjectServiceService) { }
  demande: DemandeRealisation;
  modeinsert: boolean = false;
  listeCVs: CvGlobale[];
  idProjet;
  ngOnInit() {
    this.route.params.subscribe(
      params => {
        if (params.idProjet) {
          this.idProjet = params.idProjet;
        }
        if (params.id) {
          this.modeinsert = false;
          this.projectservice.getdemandeByid(params.id)
            .subscribe(data => {
              this.demande = data;
            }, erreur => {
              console.log(erreur);
            });
        } else {
          this.demande = new DemandeRealisation();
          this.modeinsert = true;
        }
      }, erreur => {
        console.log(erreur);
      })
    let iduser = this.tockeService.GetUserId();
    if (iduser) {
      this.cvService.GetCVFromUser(iduser.toString())
        .subscribe(data => {
          this.listeCVs = data;
        }
          , erreur => {
            console.log(erreur);
          });
    }
    console.log("liste des cv pour ce utilisateur :" + this.listeCVs)
  }
  onUpdatedemmande(fdemande) {
    if(this.modeinsert===true){
      let iduser=this.tockeService.GetUserId();
      this.projectservice.addDemmandeToProjet(fdemande, this.idProjet,iduser)
        .subscribe(demande => {
          console.log(demande);
        }, erreur => {
          console.log(erreur)
        });
    }else{

    }
   
  }
}
