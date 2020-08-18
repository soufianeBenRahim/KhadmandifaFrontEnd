import { Component, OnInit, Input } from '@angular/core';

import { TokenStorageService } from '../_services/token-storage.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { UserService } from '../_services/user.service';
import { CV, CvGlobale } from '../Model/CV';
import { CvServiceService } from '../_services/cv-service.service';
import { IAppUser } from '../Model/User';
import { ProjectServiceService } from '../project-service.service';
import { Projet } from '../Model/Projet';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  CVgs :CvGlobale[];
  selectedCV :CvGlobale;
  SelectedUser:IAppUser;
  projects:Projet[];
  constructor(private router:Router,
    private route:ActivatedRoute,
    private userserv : UserService,
    private cvService : CvServiceService,
    private projectservice : ProjectServiceService) { }

  ngOnInit() {

      this.route.params.subscribe(
      params => 
      {
        console.log("param id"+params);
      
        this.userserv.GetUserById(params.id).subscribe(
          data=>{
            console.log('GetUserById in frofile compenete '+data)
            this.SelectedUser=data;
            
            if(this.SelectedUser.typeuser='EE'){
              this.cvService.GetCVFromUser(params.id).subscribe(data=>{
                console.log(data)
                this.CVgs=data;
              },err=>{
                console.log(err);
              });

            }else{

              this.projectservice.GetProjectsFromUser(params.id).subscribe(data=>{
                console.log(data)
                this.projects=data;
              },err=>{
                console.log(err);
              });

            }
          },err=>{
            console.log(err);
          }
        );
      },erruer=>{
        console.log(erruer)
      }
      )
    }
    onSelectedCvCahge(c:CvGlobale){
      this.selectedCV=c;
      console.log("type user : "+this.SelectedUser.typeuser);
      console.log("cv selectionner dans la page profile"+this.selectedCV);
    }

}

