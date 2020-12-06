import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { AuthService } from './_services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  isConnectedSubscription: Subscription;
  curentUser
  constructor(private tokenStorageService: TokenStorageService,
    private authenticationService:AuthService,
    private router:Router) { }

  ngOnInit() {

   this.curentUser = this.tokenStorageService.getUser()[0];

   this.ActiveShortCut();
    this.isConnectedSubscription=this.authenticationService
    .getIsConnectedObservabel().subscribe(message => {
      console.log(" receverd mesdage : "+message);
        if ("connected"==message.text) {
          console.log("connected");
          this.isLoggedIn =true;
          this.curentUser = this.tokenStorageService.getUser()[0];
        } else if("desconected"==message.text){
          console.log("desconected");
          // clear messages when empty message received
          this.isLoggedIn =false;
          this.curentUser = undefined;
          this.ActiveShortCut();
        }
    },err=>{
      console.log(err);
    });
  }
ActiveShortCut(){
   console.log('ActiveShortCut on init component '+this.curentUser);
   if(!this.curentUser)
   {
    this.isLoggedIn=false;
   }else{
    this.isLoggedIn=true;
   }    
 }
 onclickprofile(){
   
  console.log('is loged ='+this.isLoggedIn);
  this.router.navigate(['/profile',this.curentUser.id,'view']);
 }
  logout() {
    this.authenticationService.logOut();
    this.router.navigateByUrl("/login");
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.isConnectedSubscription.unsubscribe();
  }
  onAddProject(){
    console.log('open project mode fiche');
    this.router.navigate(['/project','fiche']);
  }
}