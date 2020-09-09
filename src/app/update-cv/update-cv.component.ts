import { Component, OnInit, Input, ViewChild } from '@angular/core';


@Component({
  selector: 'app-update-cv',
  templateUrl: './update-cv.component.html',
  styleUrls: ['./update-cv.component.css']
})
export class UpdateCVComponent implements OnInit  {

  constructor() { }


  ngOnInit() {
  }

  @Input() modeInsert: boolean;


  @ViewChild('closebuttonUpdateCV',{static: false}) closebuttonUpdateCV;
  onUpdateCV(cv){
    console.log(" onUpdateCV modeinset "+this.modeInsert)
   
    this.closebuttonUpdateCV.nativeElement.click();
  }
}
