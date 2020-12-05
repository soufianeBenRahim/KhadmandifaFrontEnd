import { ActivatedRoute, Router } from '@angular/router';
import { Component,  OnInit } from '@angular/core';
import { CVComponent } from '../cv/cv.component';
import { CvGlobale } from '../Model/CV';
import { DemandeRealisation } from '../Model/DemandeRealisation';
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
    private projectservice: ProjectServiceService,
    private router : Router) { }
  demande: DemandeRealisation;
  modeinsert: boolean = false;
  listeCVs: CvGlobale[];
  idProjet;
  idcv;
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
          this.demande = { } as DemandeRealisation;
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
      this.demande.detailDemmande=fdemande.detailDemmande;
      this.demande.proposition=fdemande.proposition;
      this.projectservice.addDemmandeToProjet(fdemande,this.idProjet ,iduser,fdemande.cvs)
        .subscribe(demande => {
          console.log(demande);
          this.router.navigate(['/project','liste']);
        }, erreur => {
          console.log(erreur)
        });
    }else{

    }
   
  }
}
