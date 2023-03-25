import { Component, OnInit } from '@angular/core';
import { AddclassService } from './addclass.service';

interface Login{
  username:String,
  secretcode:String
}

interface ProfileStatus{
  id:number,
  name:String,
  gender:String,
  roll_no:String,
  standard:String,
  section:String,
  persist:boolean,
  register:Register
}
interface Register{
  orgName:String,
  username:String,
  secretcode:String,
  accesscode:String
}

interface Image{
  name:String,
  imageurl:any,
  registerid:number
}
interface Teacher{
  id:number,
  name:String,
  gender:String,
  branch:String,
  experience:number,
  persist:boolean,
  user:Register
}


@Component({
  selector: 'app-addclass',
  templateUrl: './addclass.component.html',
  styleUrls: ['./addclass.component.scss']
})
export class AddclassComponent implements OnInit{

  standardList:any=[];
  sectionList:any=[];
  teacherList:any=[];

  constructor(private service:AddclassService){

  }
  ngOnInit(): void {
    this.getStandardList();
    this.getSectionList();
  }

  getStandardList(){
    this.service.getStandardList().subscribe((data)=>{
      this.standardList=data;
    });
  }

  getSectionList(){
    this.service.getSectionList().subscribe((data)=>{
      this.sectionList=data;
    });
  }

  getAllTeacher(){
    this.service.getAllTeacher().subscribe((data)=>{
      this.teacherList=data;
    });
  }

  logout(){
    sessionStorage.clear();
  }
}
