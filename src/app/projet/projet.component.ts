import { Component, OnInit, Input } from '@angular/core';
import { Projet } from '../Model/Projet';


@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {
 
  @Input()  projects: Projet[];
  curentProjet:Projet;
  @Input() mode="liste"
  constructor() { }

  ngOnInit() {
  }

}
