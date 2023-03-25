import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-updateclass',
  templateUrl: './updateclass.component.html',
  styleUrls: ['./updateclass.component.scss']
})
export class UpdateclassComponent implements OnInit{
  constructor(){

  }

  ngOnInit(): void {
    
  }

  logout(){
    sessionStorage.clear();
  }
}
