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
export class DummyService {

  login:Login;

  constructor(private http:HttpClient) {
    this.login={} as Login;
   }

  saveImage(data:FormData):Observable<any>{
    const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
    this.login=JSON.parse(sessionStorage.getItem('login')!);
    console.log(data.get("file"));
    const headers = new HttpHeaders()
  .append('Authorization', 'Basic '  + btoa(this.login.username + ':' + this.login.secretcode) );
      return this.http.post<any>("http://localhost:8080/image",data,{headers});
  }
}
