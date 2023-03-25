import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';

interface Login{
  username:String,
  secretcode:String
}


interface ProfileStatus{
  name:String,
  gender:String,
  roll_no:String,
  standard:String,
  section:String,
  persist:boolean
}

interface Image{
  name:String,
  imageurl:any,
  registerid:number
}

interface Teacher{
  name:String,
  gender:String,
  branch:String,
  experience:number
}

interface TeacherImage{
  name:String,
  teacherurl:any,
  teacherid:number
}

@Injectable({
  providedIn: 'root'
})
export class ProfilestatusService {

  login:Login;
 

  constructor(private http:HttpClient) {
      this.login={} as Login;
      
   }

  postData(profile:ProfileStatus):Observable<any>{
    this.login=JSON.parse(sessionStorage.getItem('login')!);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.login.username + ':' + this.login.secretcode) });
    return this.http.post<any>("http://localhost:8080/profile",profile,{headers});
   
  }

  postImage(file:File):Observable<Image>{
    
    const formData = new FormData();
    formData.append('file', file);
  
    this.login=JSON.parse(sessionStorage.getItem('login')!);
   
    const headers = new HttpHeaders()
   .append('Authorization', 'Basic '  + btoa(this.login.username + ':' + this.login.secretcode) )
  
    return this.http.post<any>("http://localhost:8080/image",formData,{headers});
  }


  maxSize():Observable<any>{
    this.login=JSON.parse(sessionStorage.getItem('login')!);
    const headers = new HttpHeaders()
  .append('Authorization', 'Basic '  + btoa(this.login.username + ':' + this.login.secretcode) )
    return this.http.get<any>("http://localhost:8080/maxsize",{headers});
  }

  postTeacher(teacher:Teacher):Observable<any>{
    this.login=JSON.parse(sessionStorage.getItem('login')!);
    const headers = new HttpHeaders()
  .append('Authorization', 'Basic '  + btoa(this.login.username + ':' + this.login.secretcode) );
    return this.http.post<any>("http://localhost:8080/teacher",teacher,{headers});
  }

  postTeacherImage(file:File):Observable<any>{
    const formData=new FormData();
    formData.append("image",file);
    this.login=JSON.parse(sessionStorage.getItem('login')!);
    const headers = new HttpHeaders()
  .append('Authorization', 'Basic '  + btoa(this.login.username + ':' + this.login.secretcode) );
  return this.http.post<any>("http://localhost:8080/teacherimage",formData,{headers});
  }

  getProfileData(name:String):Observable<any>{
    this.login=JSON.parse(sessionStorage.getItem('login')!);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.login.username + ':' + this.login.secretcode) });
    return this.http.get<any>("http://localhost:8080/getProfile/"+name,{headers})
  }

  getImage(value:number):Observable<any>{
    this.login=JSON.parse(sessionStorage.getItem('login')!);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.login.username + ':' + this.login.secretcode)});
    
    return this.http.get<any>("http://localhost:8080/image/"+value,{headers: headers, responseType:"blob" as "json"});
  }

  getTeacherImage(value:number):Observable<any>{
    this.login=JSON.parse(sessionStorage.getItem('login')!);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.login.username + ':' + this.login.secretcode)});
    
    return this.http.get<any>("http://localhost:8080/teacherImage/"+value,{headers: headers, responseType:"blob" as "json"});
  }

  getUser():Observable<any>{
    this.login=JSON.parse(sessionStorage.getItem('login')!);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.login.username + ':' + this.login.secretcode)});
    return this.http.get<any>("http://localhost:8080/user",{headers});
  }

  getlistofprofilestatus():Observable<any>{
    this.login=JSON.parse(sessionStorage.getItem('login')!);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.login.username + ':' + this.login.secretcode)});
    return this.http.get<any>("http://localhost:8080/listofprofilestatus",{headers});
  }

  getAllProfiles():Observable<any>{
    this.login=JSON.parse(sessionStorage.getItem('login')!);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.login.username + ':' + this.login.secretcode)});
    return this.http.get<any>("http://localhost:8080/allProfiles",{headers});
  }

  getActiveAllProfiles():Observable<any>{
    this.login=JSON.parse(sessionStorage.getItem('login')!);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.login.username + ':' + this.login.secretcode)});
    return this.http.get<any>("http://localhost:8080/getActiveProfiles",{headers});
  }

  getProfileStatusByRollNumber(rollnumber:String):Observable<any>{
    this.login=JSON.parse(sessionStorage.getItem('login')!);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.login.username + ':' + this.login.secretcode)});
    return this.http.get<any>("http://localhost:8080/getProfileByRollNumber/"+rollnumber,{headers});
  }

  getProfileStatusByStandard(standard:String):Observable<any>{
    this.login=JSON.parse(sessionStorage.getItem('login')!);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.login.username + ':' + this.login.secretcode)});
    return this.http.get<any>("http://localhost:8080/getProfileByStandard/"+standard,{headers});

  }

  getTeacherByName(name:String):Observable<any>{
    this.login=JSON.parse(sessionStorage.getItem('login')!);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.login.username + ':' + this.login.secretcode)});
    return this.http.get<any>("http://localhost:8080/getTeacherByName/"+name,{headers})
  }

  getTeacherList():Observable<any>{
    this.login=JSON.parse(sessionStorage.getItem('login')!);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.login.username + ':' + this.login.secretcode)});
    return this.http.get<any>("http://localhost:8080/getTeacherList",{headers});
  }

  getAllTeacherList():Observable<any>{
    this.login=JSON.parse(sessionStorage.getItem('login')!);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.login.username + ':' + this.login.secretcode)});
    return this.http.get<any>("http://localhost:8080/allTeacherList",{headers});
  }

  getTeacherByBranch(branch:String):Observable<any>{
    this.login=JSON.parse(sessionStorage.getItem('login')!);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.login.username + ':' + this.login.secretcode)});
    return this.http.get<any>("http://localhost:8080/getTeacherByBranch/"+branch,{headers});
  }

  getTeacherByExperience(exp:String):Observable<any>{
    this.login=JSON.parse(sessionStorage.getItem('login')!);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.login.username + ':' + this.login.secretcode)});
    return this.http.get<any>("http://localhost:8080/getTeacherByExperience/"+exp,{headers});
  }

 

}
