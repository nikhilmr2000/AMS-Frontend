import { IfStmt, ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit,Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { UpdateprofileService } from './updateprofile.service';
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
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.scss']
})
export class UpdateprofileComponent implements OnInit{


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

  editprofile:ProfileStatus;
  genderlist:String[]=["Male","Female","Others"];
  newfile:File;
  updatedProfile:ProfileStatus;
  updatedFile:File;
  updatedsize:number=0;
  updateTrue:boolean=false;

  //Teacher
  teacherprofile:Teacher;
  teachersize:number=0;
  teacherFile:File;
  teacherupdate:boolean=false;

  //Persist
  pstudent:boolean=false;
  pteacher:boolean=false;

  //New Student List
  newstudent:ProfileStatus[]=[];

  constructor(private service:UpdateprofileService,private sanitizer:DomSanitizer,private renderer:Renderer2){
    this.file={} as File;
    this.newfile={} as File;
    this.image={} as File;
    this.profileStatus={} as ProfileStatus;
    this.teacher={} as Teacher;
    this.profilefordisplay={} as ProfileStatus;
    this.displayteacherprofile={} as Teacher;
    this.user={} as Register;
    this.editprofile={} as ProfileStatus;
    this.updatedProfile={} as ProfileStatus;
    this.updatedFile={} as File;
    this.teacherprofile={} as Teacher;
    this.teacherFile={} as File;
  }

  ngOnInit(): void {
    const body = document.getElementById("status1");
    const gradient = 'linear-gradient(white,rgb(131, 193, 228))';
    this.renderer.setStyle(body, 'background-image', gradient);
    if(this.updatedProfile.name==undefined){
      this.updatedProfile.name="";
      this.updatedProfile.gender="";
      this.updatedProfile.roll_no="";
      this.updatedProfile.standard="";
      this.updatedProfile.section="";
    }

    this.service.maxSize().subscribe((data)=>{
      this.maxsize=data;
    });

  }

  onStudent(event:any){

    

    if(event.target.checked){
      this.student=true;
      const body = document.getElementById("status1");
      const gradient = 'linear-gradient(white,rgb(131, 193, 228))';
      this.renderer.setStyle(body, 'background-image', gradient);
      this.teach=false;
      this.badname=false;
    }
  }

  onTeacher(event:any){
    if(event.target.checked){
      this.student=false;
      this.teach=true;
      const body = document.getElementById("status1");
      const gradient = 'linear-gradient(white,rgb(144, 239, 157))';
      this.renderer.setStyle(body, 'background-image', gradient);
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

      this.service.updateProfileByName(this.names).subscribe((data)=>{
            this.nameList=data;
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
      this.service.updateProfileByRollNumber(this.names).subscribe((data)=>{
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
      this.service.updateProfileByStandard(this.names).subscribe((data)=>{
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

  onFileSelected(event:any){
    this.file=event.target.files[0];
    console.log(this.file.name);
    this.size=this.file.size;
    console.log(this.file.size);
  } 


  clickedProfile(profile:ProfileStatus){

  //Define a backend for posting the profile details for Image
  this.pstudent=true;
  this.pteacher=false;
    if(profile.name!=null && profile.persist==true){
      this.updatedProfile=profile;
      this.updateTrue=true;
    }

    this.service.updateImageProfile(this.updatedProfile.id).subscribe((data)=>{
      this.newfile = new File([data], 'file', { type: 'image/jpeg;image/png' });
      console.log(this.newfile.name);
      
    });
    // var country=document.querySelector("#country");
    // let male=document.getElementById("male");
    // let female=document.getElementById("female");
    // let others=document.getElementById("others");
    

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

      if(this.profilestatuslist.length==0){
        this.profilestatuslistsize=true;
      }
      else{
        this.profilestatuslistsize=false;
      }
    });
  }

  teacherdataPost(){
    if(this.teachernames==""){
      this.badteachername=true;
      this.errordata="Search By Teacher Name, Subject or Experience";
    }
    else if(this.teachernames=="teachername" && this.teachname!=""){
      //Add the Api for the teacher name Retrieval
      this.service.updateTeacherByName(this.teachname).subscribe((data)=>{
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
      this.service.updateTeacherBySubject(this.teachname).subscribe((data)=>{
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
      this.service.updateTeacherByExperience(this.teachname).subscribe((data)=>{
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
    this.pteacher=true;
    this.pstudent=false;
    if(teacher.name!=null && teacher.persist==true){
      console.log(teacher);
      this.teacherprofile=teacher;
      this.teacherupdate=true;
    }

      this.service.getImage(teacher.id).subscribe((data)=>{
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

  logout(){
    sessionStorage.clear();
  }

  onupdatedEvent(event:any){
    this.updatedFile=event.target.files[0];
    this.updatedsize=this.updatedFile.size;
  }

  clickUpdatedProfile(){
    if(this.maxsize>this.updatedsize){

      if((this.updatedProfile.name!=null && this.updatedProfile.name!="") && 
      (this.updatedProfile.gender!=null && this.updatedProfile.gender!="")&& 
      (this.updatedProfile.roll_no!=null && this.updatedProfile.roll_no!="")&& 
      (this.updatedProfile.section!=null && this.updatedProfile.section!="") && 
      (this.updatedProfile.standard!=null && this.updatedProfile.standard!="") && this.updateTrue==true){
        
        if(this.updatedProfile.persist==true){

          this.service.updateProfileStatus(this.updatedProfile).subscribe((data)=>{
            console.log(data);
            if(data.name!=null){
              if(this.updatedFile.name!=null){
                this.service.updateImageProfileStatus(this.updatedFile,this.updatedProfile.id).subscribe((data)=>{
                  alert("Profile Details along with Profile Photo of the student has been updated");
                  location.reload();
                });
              }
              else{
                alert("Profile Details of the student has been updated");
                location.reload();
              }
            }
            else{
              alert("Data Already Exist with same roll-number on same Class");
            }
          });
        }
        else{
          alert("The Student Profile is no longer the part of this organisation");
        }
      }
      else{
        alert("Fill all the Details and Please update the details already added");
        location.reload();
      } 
    }
    else{
      console.log(this.maxsize);
      alert("Image Size Should be less than 1 MB ");
    } 
  }


  onUpdateTeacher(event:any){
    this.teacherFile=event.target.files[0];
    console.log(this.teacherFile);
    this.teachersize=this.teacherFile.size;
  }


  clickedTeacherProfile(){
   
      if(this.maxsize>this.teachersize){
        if((this.teacherprofile.name!=null && this.teacherprofile.name!="") && 
        (this.teacherprofile.gender!=null && this.teacherprofile.gender!="") &&
        (this.teacherprofile.branch!=null && this.teacherprofile.branch!="") &&
        (this.teacherprofile.experience!=0) && this.teacherupdate==true
        ){

          if(this.teacherprofile.persist==true){
            
            this.service.updateTeacherService(this.teacherprofile).subscribe((data)=>{
              console.log(data);
              if(data.name!=null){
                if(this.teacherFile.name!=null){
                  this.service.updateTeacherImage(this.teacherFile,this.teacherprofile.id).subscribe((data)=>{
                    console.log(data);
                    alert("Teacher Details along with Profile Photo of the teacher has been updated");
                    location.reload();
                  });
                }
                else{
                  alert("Teacher Details has been updated");
                  //location.reload();
                }
              }
              else{
                alert("Fill all the details Correctly");
              }
            });
          }
          else{
            alert("This teacher profile is no longer the part of this organisation");
          }
          
        }
        else{
          alert("Please update the Teacher Profile Added Already");
          location.reload();
        }
          
      }
      else{
        alert("Upload Image size should be less than 1 MB");
      }
  }

  leaveStudent(){
    if(this.updatedProfile.name!=null){
      this.service.persistStudent(this.updatedProfile).subscribe((data)=>{
        console.log(data);
        alert("Thank you !! All the best for your future endeavours");
        location.reload();
      });
    }
  }
  leaveTeacher(){
    if(this.teacherprofile.name!=null){
      this.service.persistTeacher(this.teacherprofile).subscribe((data)=>{
        console.log(data);
        alert("Thank you !! All the best for your future endeavours");
        location.reload();
      });
    }
  }

}
