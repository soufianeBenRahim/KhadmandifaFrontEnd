import { Component, OnInit, Input } from '@angular/core';
import { CvGlobale } from '../Model/CV';


@Component({
  selector:'cv-component',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CVComponent implements OnInit {
constructor() { }
@Input() Cvg : CvGlobale;


  ngOnInit() {
  console.log('cv recuperee dans le composent CV '+this.Cvg);
  }
}
