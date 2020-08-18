import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Projet } from '../Model/Projet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  projects: Projet[];

  constructor(private userService: UserService) { }

  ngOnInit() {
   this.userService.getPublicContent().subscribe(data=>{
    console.log(data);
    this.projects=data;
    },erruer=>{
    console.log(erruer);
    })
  }
}