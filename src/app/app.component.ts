import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { AuthService } from './_services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  isConnectedSubscription: Subscription;
  username="soufiane";
  constructor(private tokenStorageService: TokenStorageService,private authenticationService:AuthService) { }

  ngOnInit() {

   //this.isConnectedSubscription=
   this.isLoggedIn=!!this.tokenStorageService.getToken;
    this.isConnectedSubscription=this.authenticationService.getIsConnectedObservabel().subscribe(message => {
        if ("connected"==message.text) {
          console.log("connected");
          this.isLoggedIn =true;
        } else if("desconected"==message.text){
          console.log("desconected");
          // clear messages when empty message received
          this.isLoggedIn =false;
      }
    });;

  }

  logout() {
    this.authenticationService.logOut();
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.isConnectedSubscription.unsubscribe();
  }
}