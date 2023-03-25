import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfilestatusService } from './profilestatus.service';

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

interface Register{
  orgName:String,
  username:String,
  secretcode:String,
  accesscode:String
}

@Component({
  selector: 'app-profilestatus',
  templateUrl: './profilestatus.component.html',
  styleUrls: ['./profilestatus.component.scss']
})
export class ProfilestatusComponent implements OnInit{
    
    @Input()
    profileStatus:ProfileStatus;

    @Input()  
    teacher:Teacher;

    file:File;
    image:File;

    maxsize:number=0;
    size:number=0;
    imgsize:number=0;

    status1:boolean=true;
    status2:boolean=false;
    status3:boolean=false;

    student:boolean=true;
    teach:boolean=false;

    studentname:String="none";
    names:String="";
    nameList:ProfileStatus[]=[];

    profilescreen:boolean=false;
    profilefordisplay:ProfileStatus;

    imageUrl:any;
    byteArray:Uint8Array = new Uint8Array();
    noData:String="";
    badname:boolean=false;

    user:Register;
    profilestatuslist:ProfileStatus[]=[];
    profilestatuslistsize:boolean=false;

    imagedefinition:any;
    images:any;
    starter:boolean=false;


    listofprofiles:ProfileStatus[]=[];
    sizeoflist:number=0;

    getActiveOneList:ProfileStatus[]=[];

    //Teacher Attributes
    teachernames:String="";
    teacherdata:Teacher[]=[];
    badteachername:boolean=false;
    errordata:String="";
    teachname:String="";


    imageTeacherUrl:any;
    displayteacherprofile:Teacher;
    teacherscreen:boolean=false;

    teacherList:Teacher[]=[];
    teacherListsize:boolean=false;
    countList:Teacher[]=[];
    countTeacher:number=0;
    teacherpersist:number=0;

    constructor(private router:Router,private service:ProfilestatusService,private sanitizer:DomSanitizer){
      // this.imageUrl={} as SafeUrl;
      this.file={} as File;
      this.image={} as File;
      this.profileStatus={} as ProfileStatus;
      this.teacher={} as Teacher;
      this.profilefordisplay={} as ProfileStatus;
      this.displayteacherprofile={} as Teacher;
      this.user={} as Register;
    }

    ngOnInit(): void {

      if(this.status1==true){

      let check=document.getElementById("check");
      let student=document.getElementById("student");
      let teacher=document.getElementById("teacher");

        student?.classList.remove("active");
        teacher?.classList.remove("active");
        check?.classList.add("active");
      }

      this.service.maxSize().subscribe((data)=>{
        this.maxsize=data;
      });

      this.service.getUser().subscribe((data)=>{
        this.user=data;
      });

      if(this.starter==false){
        this.getlistofprofilestatus();
        this.getAllListOfProfiles();
        this.getActiveProfileList();
        this.getlistofteacherstatus();
        this.getTeacherList();
        this.starter=true;
        console.log("Called");
      }
      
     
    }

    logout(){
      sessionStorage.clear();
    }

    addstudentprofile(){
      this.router.navigateByUrl("/profilestatus");
    }


    onFileSelected(event:any){
      this.file=event.target.files[0];
      this.size=this.file.size;
      console.log(this.file.size);
    } 

    onTeacherFileSelected(event:any){
      this.image=event.target.files[0];
      this.imgsize=this.image.size;
    }

    savepostData(){

      if(this.maxsize>this.size){
        if((this.profileStatus.name!=null && this.profileStatus.name!="") && 
        (this.profileStatus.gender!=null && this.profileStatus.gender!="")&& 
        (this.profileStatus.roll_no!=null && this.profileStatus.roll_no!="")&& 
        (this.profileStatus.section!=null && this.profileStatus.section!="") && 
        (this.profileStatus.standard!=null && this.profileStatus.standard!="") && this.file.name!=null){
          this.profileStatus.persist=true;
          this.service.postData(this.profileStatus).subscribe((data)=>{
            console.log("Saved Profile Data");
            if(data.name!=null){
              this.service.postImage(this.file).subscribe((data)=>{
                alert("Student Profile Added");
                location.reload();
              });
            }
            else{
              alert("Data Already Exist with same roll-number on same Class");
            }
          });
        }
        else{
          alert("Fill all the Details and Upload the Image Correctly");
        } 
      }
      else{
        console.log(this.maxsize);
        alert("Image Size Should be less than 1 MB ");
      }         
      
    }

    status(value:number){
      let check=document.getElementById("check");
      let student=document.getElementById("student");
      let teacher=document.getElementById("teacher");

      if(value==1){
        this.status1=true;
        this.status2=false;
        this.status3=false;
        student?.classList.remove("active");
        teacher?.classList.remove("active");
        check?.classList.add("active");
        console.log(1);

      }
      else if(value==2){
        this.status1=false;
        this.status2=true;
        this.status3=false;
        check?.classList.remove("active");
        student?.classList.add("active");
        teacher?.classList.remove("active");
        console.log(2);
      }
      else if(value==3){
        this.status1=false;
        this.status2=false;
        this.status3=true;
        student?.classList.remove("active");
        check?.classList.remove("active");
        teacher?.classList.add("active");
        console.log(3);
      }
      
    }


    postTeacherDetails(){
      if(this.maxsize>this.imgsize){
        if((this.teacher.name!=null && this.teacher.name!="") && 
        (this.teacher.gender!=null && this.teacher.gender!="") &&
        (this.teacher.branch!=null && this.teacher.branch!="") &&
        (this.teacher.experience!=0) 
        ){
          this.service.postTeacher(this.teacher).subscribe((data)=>{
            if(data.name!=null){
              this.service.postTeacherImage(this.image).subscribe((data)=>{
                console.log("Image Saved");
                alert("Teacher Profile Added");
                location.reload();
              });
            }
            else{
              alert("Fill all the details Correctly");
            }
          });
        }
        else{
          alert("Fill all the details Correctly");
        }
          
      }
      else{
        alert("Upload Image size should be less than 1 MB");
      }
    }


    onStudent(event:any){

      //let teach=document.getElementById("stu");

      if(event.target.checked){
        this.student=true;
        this.teach=false;
        this.badname=false;
      }
    }

    onTeacher(event:any){
      if(event.target.checked){
        this.student=false;
        this.teach=true;
        this.badname=false;
      }
    }

    onStudentProfile(){
      console.log(this.names);

      if(this.studentname=="none"){
        this.badname=true;
        this.noData="Search by name, standard or roll number";
      }

      if(this.studentname=="name" && this.names!=""){
        this.service.getProfileData(this.names).subscribe((data)=>{
          console.log(data);
              this.nameList=data;
              console.log(this.nameList);
              if(this.nameList.length!=0){
                this.badname=false;
              }
              else{
                this.badname=true;
                this.noData="No such Profile with this Name";
              }
        });
      }
      else if(this.studentname=="rollnumber" && this.names!=""){
        this.service.getProfileStatusByRollNumber(this.names).subscribe((data)=>{
          this.nameList=data;
          console.log(this.nameList);
          if(this.nameList.length!=0){
            this.badname=false;
          }
          else{
            this.badname=true;
            this.noData="No such Profile with this Roll Number";
          }
        })
      }

      else if(this.studentname=="standard" && this.names!=""){
        this.service.getProfileStatusByStandard(this.names).subscribe((data)=>{
          this.nameList=data;
          console.log(this.nameList);
          if(this.nameList.length!=0){
            this.badname=false;
          }
          else{
            this.badname=true;
            this.noData="No such Profile with this Standard";
          }
        });
      }

      else{
        console.log("bad name");
        this.nameList=[];

      }

    } 


    clickedProfile(profile:ProfileStatus){

    //Define a backend for posting the profile details for Image
      

      this.service.getImage(profile.id).subscribe((data)=>{
        const blob = new Blob([data], { type: 'image/jpg;image/png' });
        this.imageUrl = URL.createObjectURL(blob);
        this.imageUrl=this.sanitizer.bypassSecurityTrustUrl(this.imageUrl);
        console.log(this.imageUrl);
      });
      

      this.profilefordisplay=profile;
      console.log(this.profilefordisplay.id);
      this.nameList=[];
      this.profilescreen=true;
      console.log(profile);

    }         

    getlistofprofilestatus(){
      this.service.getlistofprofilestatus().subscribe((data)=>{
        this.profilestatuslist=data;

        for(let i=0;i<this.profilestatuslist.length;i++){
          this.service.getImage(this.profilestatuslist[i].id).subscribe((data)=>{

            const blob = new Blob([data], { type: 'image/jpg;image/png' });
            this.imagedefinition=URL.createObjectURL(blob);
            this.imagedefinition=this.sanitizer.bypassSecurityTrustUrl(this.imagedefinition);
            this.images[i]=this.imagedefinition;

            
          });
        }

        if(this.profilestatuslist.length==0){
          this.profilestatuslistsize=true;
        }
        else{
          this.profilestatuslistsize=false;
        }
      });
    }


    getAllListOfProfiles(){
      this.service.getAllProfiles().subscribe((data)=>{
        this.listofprofiles=data;
        this.sizeoflist=this.listofprofiles.length;
      });
    }

    getActiveProfileList(){
      this.service.getActiveAllProfiles().subscribe((data)=>{
        this.getActiveOneList=data;
        console.log(this.getActiveOneList);
      });
    }

    teacherdataPost(){
      if(this.teachernames==""){
        this.badteachername=true;
        this.errordata="Search By Teacher Name, Subject or Experience";
      }
      else if(this.teachernames=="teachername" && this.teachname!=""){
        //Add the Api for the teacher name Retrieval
        this.service.getTeacherByName(this.teachname).subscribe((data)=>{
          this.teacherdata=data;
          if(this.teacherdata.length!=0){
            this.badteachername=false;
          }
          else{
            this.badteachername=true;
            this.errordata="No such Teacher with this Name";
          }
        });
      }

      else if(this.teachernames=="subject" && this.teachname!=""){
        this.service.getTeacherByBranch(this.teachname).subscribe((data)=>{
          this.teacherdata=data;
          if(this.teacherdata.length!=0){
            this.badteachername=false;
          }
          else{
            this.badteachername=true;
            this.errordata="No such Teacher with this Subject";
          }
        });
      }

      else if(this.teachernames=="experience" && this.teachname!=""){
        this.service.getTeacherByExperience(this.teachname).subscribe((data)=>{
          this.teacherdata=data;
          if(this.teacherdata.length!=0){
            this.badteachername=false;
          }
          else{
            this.badteachername=true;
            this.errordata="No such Teacher with this Experience";
          }
        });
      }

      else{
        this.teacherdata=[];
      }
    }

    clickedTeacher(teacher:Teacher){
          
      //Define a backend for posting the profile details for Image
        
  
        this.service.getTeacherImage(teacher.id).subscribe((data)=>{
          const blob = new Blob([data], { type: 'image/jpg;image/png' });
          this.imageTeacherUrl = URL.createObjectURL(blob);
          this.imageTeacherUrl=this.sanitizer.bypassSecurityTrustUrl(this.imageTeacherUrl);
          console.log(this.imageUrl);
        });
        
  
        this.displayteacherprofile=teacher;
        console.log(this.displayteacherprofile);
        console.log(this.profilefordisplay.id);
        this.teacherdata=[];
        this.teacherscreen=true;
        
  
      }    


      getlistofteacherstatus(){
        this.service.getTeacherList().subscribe((data)=>{
          console.log(data);
          this.teacherList=data;
          console.log(this.teacherList);
          if(this.teacherList.length==0){
            this.teacherListsize=true;
          }
          else{
            this.teacherListsize=false;
          }
        });
      }

      getTeacherList(){
        this.service.getAllTeacherList().subscribe((data)=>{
          console.log(data);
          this.countTeacher=data.length;
          this.countList=data;
          for(let i=0;i<this.countTeacher;i++){
            if(this.countList[i].persist==true){
              //  console.log(true);
                this.teacherpersist++;
            }
          }
        });

      }

}
