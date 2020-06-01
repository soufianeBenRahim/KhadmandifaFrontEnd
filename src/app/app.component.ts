import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { AuthService } from './_services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CvServiceService} from './_services/cv-service.service'
import { CV } from './Model/CV';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  isConnectedSubscription: Subscription;
  user:user ;
  
  constructor(private tokenStorageService: TokenStorageService,private authenticationService:AuthService,private router:Router,private cvServices :CvServiceService) { }

  ngOnInit() {
    
   //this.isConnectedSubscription=
   this.user=JSON.parse(this.tokenStorageService.getUser());
   console.log('user on init componet '+this.user);
   this.isLoggedIn=!!this.tokenStorageService.getToken;
   this.ActiveShortCut();
    this.isConnectedSubscription=this.authenticationService.getIsConnectedObservabel().subscribe(message => {
        if ("connected"==message.text) {
          console.log("connected");
          this.user=this.tokenStorageService.getUser();
          console.log( 'app compennete int user :'+this.user);
          this.isLoggedIn =true;
        } else if("desconected"==message.text){
          console.log("desconected");
          // clear messages when empty message received
          this.isLoggedIn =false;
          this.user=null;
        }
    },err=>{
      console.log(err);
    });
  }
ActiveShortCut(){
   
  if(this.user){
    console.log( 'app compennete int user :'+this.user);
    this.isLoggedIn =true;
    }else{
    this.isLoggedIn =false;
  }
 }
  logout() {
    this.authenticationService.logOut();
    this.router.navigateByUrl("/login");
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.isConnectedSubscription.unsubscribe();
  }
}