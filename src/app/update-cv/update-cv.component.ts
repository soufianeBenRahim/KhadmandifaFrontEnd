import { EventEmitter,Component, OnInit, Input, ViewChild, Output } from '@angular/core';
import { CV } from '../Model/CV';
import { CvServiceService } from '../_services/cv-service.service';
import { TokenStorageService } from '../_services/token-storage.service';


@Component({
  selector: 'app-update-cv',
  templateUrl: './update-cv.component.html',
  styleUrls: ['./update-cv.component.css']
})
export class UpdateCVComponent implements OnInit  {

  constructor(private cvService : CvServiceService,private tockenServe : TokenStorageService) { }

@Output() add : EventEmitter<CV>=new EventEmitter();
@Output() update : EventEmitter<CV>=new EventEmitter(); 
  ngOnInit() {
  }

  @Input() modeInsert: boolean;
  @Input() selectedCv: CV;

  @ViewChild('closebuttonUpdateCV',{static: false}) closebuttonUpdateCV;
  onUpdateCV(cv){
    if(this.modeInsert){
      this.Addcv(cv);
    }else{
      this.updateCv(cv);
    }
    this.closebuttonUpdateCV.nativeElement.click();
  }
Addcv(cv){
  let userId=this.tockenServe.GetUserId();
  console.log('user from local storge : '+userId)
  if(userId==undefined ){
    return;
  }
  console.log(" onAdd modeinset "+this.modeInsert)
  this.cvService.addCv(cv,userId).subscribe(data=>{
    console.log(' add cv :'+data);
    this.add.emit(data);
  },erreur=>{
    console.log(' add cv  erreur :'+erreur);
  });
  
}
updateCv(cv){
  console.log(" onUpdateCV modeinset "+this.modeInsert)
  this.cvService.UpdateCV(this.selectedCv.id,cv).subscribe(data=>{
    console.log(' update cv :'+data);
   this.update.emit(data);
  },erreur=>{
    console.log(' update cv  erreur :'+erreur);
  });
}
}
