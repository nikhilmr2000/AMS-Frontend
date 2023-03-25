import { HttpClient } from '@angular/common/http';
import { Component ,Input,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterService } from './register.service';

interface Register{
  orgName:String,
  username:String,
  secretcode:String,
  accesscode:String
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  
  @Input()
  register:Register;
  secretcode:String="";


  constructor(private service:RegisterService,private router:Router){
    this.register={} as Register;
  }

  ngOnInit(): void {
    
  }

  postDetails(){
    if(this.secretcode==this.register.secretcode){
      this.service.postHomeDetails(this.register).subscribe((data)=>{
        if(data.username==null){
          alert("Username already exists");
        }
        else{
          if(data.accesscode=="accesserror"){
            alert("Invalid Access Code");
          }
          else{
            alert("Registered Successfully");
            this.router.navigateByUrl("/");
          }
        }
      })
    }
    else{
      alert("Password Mismatch");
    }
    
  } 
}
