import { Component, OnInit, Input } from '@angular/core';
import { CvGlobale } from '../Model/CV';


@Component({
  selector:'cv-component',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CVComponent implements OnInit {
constructor() { }
_Cvg : CvGlobale;

@Input()
set Cvg(val: CvGlobale) {
  console.log('currently selected item=', val);
  this._Cvg = val;
}
  ngOnInit() {
  console.log('cv recuperee dans le composent CV '+this.Cvg);
  }
}
