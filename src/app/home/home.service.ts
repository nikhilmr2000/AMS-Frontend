import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Login{
  username:String,
  secretcode:String
}


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  boolval:boolean=false;

  constructor(private http:HttpClient){
    
  }


  getAuthDetails(login:Login):Observable<any>{
   // this.login=JSON.parse(sessionStorage.getItem('login')!);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(login.username + ':' + login.secretcode) });
    
    sessionStorage.setItem('login',JSON.stringify(login));
    return this.http.get<any>("http://localhost:8080/user",{headers});
  }

  
}
