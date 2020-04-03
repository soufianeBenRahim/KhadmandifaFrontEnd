import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-compitance',
  templateUrl: './compitance.component.html',
  styleUrls: ['./compitance.component.css']
})
export class CompitanceComponent implements OnInit {
@Input() idCv:number;
  constructor() { }

  ngOnInit() {
  }

}
