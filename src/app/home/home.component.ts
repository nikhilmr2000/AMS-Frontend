import { Component,Input,OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { HomeService } from './home.service';

interface Login{
  username:String,
  secretcode:String
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  @Input()
  login:Login;

  user:Login;
  val:boolean=false;

  signedIn:boolean=false;

  constructor(private service:HomeService,private router:Router){
    this.login={} as Login;
    this.user={} as Login;
  }

  ngOnInit(): void {

    this.user=JSON.parse(sessionStorage.getItem('login')!);
    if(this.user!=null){
      this.signedIn=true;
    }
    else{
      this.signedIn=false;
    }

    console.log(this.signedIn);
  } 

  getAuthDetails(){
    if(this.login.username==null || this.login.secretcode==null){
      alert("Enter username and password");
    }
    else{
      this.service.getAuthDetails(this.login).subscribe((data)=>{
        if(data!=null){
          location.reload();
        }

      },
      (error)=>{
        if(error.status===200){
          alert("Invalid Username or Password");
          sessionStorage.clear();
          location.reload();
        }
      }
      );
    }
    
  }

  dashredirect(){
    this.router.navigateByUrl("/dashboard");
  }

  logout(){
    sessionStorage.clear();
  }

  

}
