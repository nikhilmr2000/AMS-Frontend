import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classdisplay',
  templateUrl: './classdisplay.component.html',
  styleUrls: ['./classdisplay.component.scss']
})
export class ClassdisplayComponent implements OnInit{
  constructor(){

  }
  ngOnInit(): void {
    
  }

  logout(){
    sessionStorage.clear();
  }
}
