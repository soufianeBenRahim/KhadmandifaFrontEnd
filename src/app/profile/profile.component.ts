import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from '../_services/token-storage.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;

  constructor(private tockenStorage : TokenStorageService,private userserv : UserService,private route : ActivatedRoute) { }

  ngOnInit() {
    
    let user =JSON.parse(this.tockenStorage.getUser());
    if(user){
      this.currentUser = this.userserv.GetUserById(user.id)
    }else{
      this.currentUser =null;
    }
    
  }
}

