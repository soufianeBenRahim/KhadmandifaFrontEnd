import { Component, OnInit } from '@angular/core';
import { Projet } from '../Model/Projet';


@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {
  projects: Projet[];
  constructor() { }

  ngOnInit() {
  }

}
