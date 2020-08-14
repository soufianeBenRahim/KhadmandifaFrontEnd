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

  iduser :string;
  
  constructor(private tokenStorageService: TokenStorageService,
    private authenticationService:AuthService,
    private router:Router,
    private cvServices :CvServiceService) { }

  ngOnInit() {

   let item = this.tokenStorageService.getUser();
   this.iduser=item;
   console.log('user on init componet token '+item);
   this.isLoggedIn=!!this.tokenStorageService.getUser();
   console.log('is loged ='+this.isLoggedIn);
   this.ActiveShortCut();
    this.isConnectedSubscription=this.authenticationService.getIsConnectedObservabel().subscribe(message => {
        if ("connected"==message.text) {
          console.log("connected");
          this.iduser=this.tokenStorageService.getUser();
          console.log( 'app compennete int user observe :'+this.iduser);
          this.isLoggedIn =true;
        } else if("desconected"==message.text){
          console.log("desconected");
          // clear messages when empty message received
          this.isLoggedIn =false;
          this.iduser=null;
        }
    },err=>{
      console.log(err);
    });
  }
ActiveShortCut(){
   
  if(this.iduser){
    this.isLoggedIn =true;
    }else{
    this.isLoggedIn =false;
  }
 }
 onclickprofile(){
   console.log("onclickprofile"+this.iduser );
   console.log('is loged ='+this.isLoggedIn);
  this.router.navigate(['/profile',this.iduser]);
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