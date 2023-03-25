import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AddclassComponent } from './addclass/addclass.component';
import { ClassdisplayComponent } from './classdisplay/classdisplay.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DummyComponent } from './dummy/dummy.component';
import { HomeComponent } from './home/home.component';
import { ProfilestatusComponent } from './profilestatus/profilestatus.component';
import { RegisterComponent } from './register/register.component';
import { UpdateclassComponent } from './updateclass/updateclass.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';

const routes: Routes = [

  {path:'',component:HomeComponent},
  {path:'register',component:RegisterComponent},
  {path:'about',component:AboutComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'profilestatus',component:ProfilestatusComponent},
  {path:'dummy',component:DummyComponent},
  {path:'updateprofile',component:UpdateprofileComponent},
  {path:'addclass',component:AddclassComponent},
  {path:'updateclass',component:UpdateclassComponent},
  {path:'displayclass',component:ClassdisplayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
