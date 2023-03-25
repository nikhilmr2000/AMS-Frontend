import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfilestatusComponent } from './profilestatus/profilestatus.component';
import { DummyComponent } from './dummy/dummy.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { AddclassComponent } from './addclass/addclass.component';
import { UpdateclassComponent } from './updateclass/updateclass.component';
import { ClassdisplayComponent } from './classdisplay/classdisplay.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    AboutComponent,
    DashboardComponent,
    ProfilestatusComponent,
    DummyComponent,
    UpdateprofileComponent,
    AddclassComponent,
    UpdateclassComponent,
    ClassdisplayComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
