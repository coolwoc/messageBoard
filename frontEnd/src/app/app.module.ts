import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent }  from './app.component';

import { NavComponent } from './header/nav.component';
import { NewMessageComponent } from './newMessages/new-message.component';
import { MessagesComponent } from './messages/messages.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { routing } from './app.routing';

import { WebService } from './_providers/web.service';
import { AuthService } from './_providers/auth.service';

@NgModule({
  imports: [ 
  		BrowserModule, 
  		MaterialModule, 
      CommonModule,
  		BrowserAnimationsModule,
  		HttpModule,
      FormsModule,
      ReactiveFormsModule,
      routing
  	],
  declarations: [ 
  		AppComponent, 
  		MessagesComponent,
      NewMessageComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      LoginComponent,
      UserComponent,
      DashboardComponent
  	],
  providers: [
  		WebService,
      AuthService
  ],
  
  bootstrap:    [ AppComponent ]

})
export class AppModule { }
