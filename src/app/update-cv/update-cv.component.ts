import { EventEmitter,Component, OnInit, Input, ViewChild, Output } from '@angular/core';
import { CV } from '../Model/CV';
import { CvServiceService } from '../_services/cv-service.service';


@Component({
  selector: 'app-update-cv',
  templateUrl: './update-cv.component.html',
  styleUrls: ['./update-cv.component.css']
})
export class UpdateCVComponent implements OnInit  {

  constructor(private cvService : CvServiceService) { }

@Output() add : EventEmitter<CV>=new EventEmitter();
@Output() update : EventEmitter<CV>=new EventEmitter(); 
  ngOnInit() {
  }

  @Input() modeInsert: boolean;
  @Input() selectedCv: CV;

  @ViewChild('closebuttonUpdateCV',{static: false}) closebuttonUpdateCV;
  onUpdateCV(cv){
    if(this.modeInsert){
      this.Addcv();
    }else{
      this.updateCv();
    }
    this.closebuttonUpdateCV.nativeElement.click();
  }
Addcv(){
  console.log(" onAdd modeinset "+this.modeInsert)
  this.cvService.addCv(this.selectedCv,"4").subscribe(data=>{
    console.log(' add cv :'+data);
    this.update.emit(data);
  },erreur=>{
    console.log(' add cv  erreur :'+erreur);
  });
  
}
updateCv(){
  console.log(" onUpdateCV modeinset "+this.modeInsert)
  this.cvService.UpdateCV(this.selectedCv.id,this.selectedCv).subscribe(data=>{
    console.log(' update cv :'+data);
   this.update.emit(data);
  },erreur=>{
    console.log(' update cv  erreur :'+erreur);
  });
}
}
