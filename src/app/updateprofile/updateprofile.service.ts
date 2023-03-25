import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
export class UpdateprofileService {
  login:Login;
  constructor(private http:HttpClient) { 
    this.login={} as Login;
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

  getCurrentProfile(profile:ProfileStatus):Observable<any>{
    this.login=JSON.parse(sessionStorage.getItem('login')!);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.login.username + ':' + this.login.secretcode)});
    return this.http.post<any>("http://localhost:8080/getProfileFirst",profile,{headers});
  }

  updateImageProfile(id:number):Observable<any>{
    this.login=JSON.parse(sessionStorage.getItem('login')!);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.login.username + ':' + this.login.secretcode)});
    return this.http.get<any>("http://localhost:8080/updateImage/"+id,{headers,responseType:'blob' as 'json'});
  }

  updateProfileStatus(profile:ProfileStatus):Observable<any>{
    this.login=JSON.parse(sessionStorage.getItem('login')!);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.login.username + ':' + this.login.secretcode)});
    return this.http.put<any>("http://localhost:8080/updateProfileStatus",profile,{headers});
  }

  updateImageProfileStatus(file:File,id:number):Observable<any>{

    const formData=new FormData();
    formData.append("img",file);
    this.login=JSON.parse(sessionStorage.getItem('login')!);
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic '  + btoa(this.login.username + ':' + this.login.secretcode) );
    return this.http.put("http://localhost:8080/updateprofileimage/"+id,formData,{headers});
  }


  maxSize():Observable<any>{
    this.login=JSON.parse(sessionStorage.getItem('login')!);
    const headers = new HttpHeaders()
  .append('Authorization', 'Basic '  + btoa(this.login.username + ':' + this.login.secretcode) )
    return this.http.get<any>("http://localhost:8080/maxsize",{headers});
  }

  updateTeacherService(teacher:Teacher):Observable<any>{
    this.login=JSON.parse(sessionStorage.getItem('login')!);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.login.username + ':' + this.login.secretcode)});
    return this.http.put<any>("http://localhost:8080/updateTeacher",teacher,{headers});
  }


  updateTeacherImage(file:File,id:number):Observable<any>{
    const formData=new FormData();
    formData.append("teacher",file);
    this.login=JSON.parse(sessionStorage.getItem('login')!);
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic '  + btoa(this.login.username + ':' + this.login.secretcode) );
    return this.http.put<any>("http://localhost:8080/updateTeacherImage/"+id,formData,{headers});
  }

  persistStudent(profile:ProfileStatus):Observable<any>{
    this.login=JSON.parse(sessionStorage.getItem('login')!);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.login.username + ':' + this.login.secretcode)});
    return this.http.put<any>("http://localhost:8080/persistProfile",profile,{headers});
  }

  persistTeacher(teacher:Teacher):Observable<any>{
    this.login=JSON.parse(sessionStorage.getItem('login')!);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.login.username + ':' + this.login.secretcode)});
    return this.http.put<any>("http://localhost:8080/persistTeacher",teacher,{headers});
  }

  updateProfileByName(name:String):Observable<any>{
    this.login=JSON.parse(sessionStorage.getItem('login')!);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.login.username + ':' + this.login.secretcode)});
    return this.http.get<any>("http://localhost:8080/updateProfileByName/"+name,{headers});
  }

  updateProfileByRollNumber(rollnumber:String):Observable<any>{
    this.login=JSON.parse(sessionStorage.getItem('login')!);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.login.username + ':' + this.login.secretcode)});
    return this.http.get<any>("http://localhost:8080/updateProfileByRollNumber/"+rollnumber,{headers});
  }

  updateProfileByStandard(standard:String):Observable<any>{
    this.login=JSON.parse(sessionStorage.getItem('login')!);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.login.username + ':' + this.login.secretcode)});
    return this.http.get<any>("http://localhost:8080/updateProfileByStandard/"+standard,{headers});
  }

  updateTeacherByName(name:String):Observable<any>{
    this.login=JSON.parse(sessionStorage.getItem('login')!);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.login.username + ':' + this.login.secretcode)});
    return this.http.get<any>("http://localhost:8080/updateTeacherByName/"+name,{headers});
  }

  updateTeacherBySubject(subject:String):Observable<any>{
    this.login=JSON.parse(sessionStorage.getItem('login')!);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.login.username + ':' + this.login.secretcode)});
    return this.http.get<any>("http://localhost:8080/updateTeacherBySubject/"+subject,{headers});
  }

  updateTeacherByExperience(experience:String):Observable<any>{
    this.login=JSON.parse(sessionStorage.getItem('login')!);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.login.username + ':' + this.login.secretcode)});
    return this.http.get<any>("http://localhost:8080/updateTeacherByExperience/"+experience,{headers});
  }

}
