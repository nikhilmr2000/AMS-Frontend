import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
interface Register{
  orgName:String,
  username:String,
  secretcode:String,
  accesscode:String
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }


  postHomeDetails(register:Register):Observable<Register>{
    return this.http.post<Register>("http://localhost:8080/register",register);
  }
}
