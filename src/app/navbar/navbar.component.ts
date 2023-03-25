import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


interface Login{
  username:String,
  secretcode:String
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  user:Login;
  signed:boolean=false;
  id:number=0;
  shift:boolean=false;
  shiftreg:boolean=false;
  profile:boolean=false;
  update:boolean=false;
  updateprofile:boolean=false;
  profilelist:boolean=false;

  addclass:boolean=false;
  addclassactive:boolean=false;

  updateclass:boolean=false;
  updateclassactive:boolean=false;

  displayclass:boolean=false;
  displayclassactive:boolean=false;

  constructor(private router:Router){
    this.user={} as Login;
  }

  ngOnInit(): void {

    this.user=JSON.parse(sessionStorage.getItem('login')!);
    if(this.user!=null){
      this.signed=true;
    }
    else{
      this.signed=false;
    }

    
    if(this.router.url=="/"){
      console.log(1);
      let elem=document.getElementById("1");
      elem?.classList.add("active");
    }
    else if( this.router.url=="/register"){
      this.shiftreg=true;
      console.log(this.router.url);
      console.log(2);
      let val=document.getElementById("2");
      val?.classList.add("active");
    }
    else if(this.router.url=="/dashboard"){
      this.shift=true;
      console.log(4);
      let dec=document.getElementById("4");
      dec?.classList.add("active");
    }
    else if(this.router.url=="/about"){
      console.log(3);
      let elem=document.getElementById("3");
      elem?.classList.add("active");
    }
    else if(this.router.url=="/profilestatus"){
      let elem=document.getElementById("5");
      this.profilelist=true;
      this.profile=true;
      this.update=true;
      elem?.classList.add("active");
    }
    else if(this.router.url=="/updateprofile"){
      let elem=document.getElementById("6");
      this.updateprofile=true;
      this.update=true;
      this.profilelist=true;
      elem?.classList.add("active");
    }

    else if(this.router.url=="/addclass"){
      let elem=document.getElementById("7");
      this.displayclass=true;
      this.addclass=true;
      this.updateclass=true;
      this.addclassactive=true;
    }

    else if(this.router.url=="/updateclass"){

      let elm=document.getElementById("8");
      this.displayclass=true;
      this.updateclass=true;
      this.addclass=true;
      this.updateclassactive=true;
    }

    else if(this.router.url=="/displayclass"){
      let elm=document.getElementById("9");
      this.updateclass=true;
      this.addclass=true;
      this.displayclass=true;
      this.displayclassactive=true;
    }

    else{
      let elem=document.getElementById("1");
      elem?.classList.add("active");
    }

  }
  logout(){
    sessionStorage.clear();
  }

}
