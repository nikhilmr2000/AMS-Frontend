import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

@Injectable({
  providedIn: 'root'
})
export class AddclassService {

  login:Login;

  constructor(private httpClient: HttpClient) {
    this.login={} as Login;
   }

   getStandardList(){
    this.login=JSON.parse(sessionStorage.getItem('login')!);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.login.username + ':' + this.login.secretcode) });
    return this.httpClient.get<any>("http://localhost:8080/listofstandards",{headers});
   }

   getSectionList(){
    this.login=JSON.parse(sessionStorage.getItem('login')!);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.login.username + ':' + this.login.secretcode) });
    return this.httpClient.get<any>("http://localhost:8080/listofsections",{headers});
   }

   getAllTeacher(){
    this.login=JSON.parse(sessionStorage.getItem('login')!);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.login.username + ':' + this.login.secretcode) });
    return this.httpClient.get<any>("http://localhost:8080/getAllTeacher",{headers});
   }


}
