import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { AuthService } from './_services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CvServiceService} from './_services/cv-service.service'
import { IAppUser } from './Model/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  isConnectedSubscription: Subscription;
  Connecteduser:IAppUser ;
  
  constructor(private tokenStorageService: TokenStorageService,
    private authenticationService:AuthService,
    private router:Router,
    private cvServices :CvServiceService) { }

  ngOnInit() {

   let item = this.tokenStorageService.getUser();
   this.Connecteduser=item;
   console.log('user on init componet token '+item);
   this.isLoggedIn=!!this.tokenStorageService.getUser();
   console.log('is loged ='+this.isLoggedIn);
   this.ActiveShortCut();
    this.isConnectedSubscription=this.authenticationService.getIsConnectedObservabel().subscribe(message => {
        if ("connected"==message.text) {
          console.log("connected");
          this.Connecteduser=this.tokenStorageService.getUser();
          console.log( 'app compennete int user observe :'+this.Connecteduser);
          this.isLoggedIn =true;
        } else if("desconected"==message.text){
          console.log("desconected");
          // clear messages when empty message received
          this.isLoggedIn =false;
          this.Connecteduser=null;
        }
    },err=>{
      console.log(err);
    });
  }
ActiveShortCut(){
   
  if(this.Connecteduser){
    this.isLoggedIn =true;
    }else{
    this.isLoggedIn =false;
  }
 }
 onclickprofile(){
   console.log("onclickprofile"+(JSON.parse(JSON.stringify(this.Connecteduser))).username);
   console.log('is loged ='+this.isLoggedIn);
  this.router.navigate(['/profile',(JSON.parse(JSON.stringify(this.Connecteduser))).id]);
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