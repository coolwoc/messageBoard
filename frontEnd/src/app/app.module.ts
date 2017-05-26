import { NgModule } from '@angular/core';
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
import { WebService } from './_providers/web.service';
import { AuthService } from './_providers/auth.service';

let routes = [
  {
      path: '', 
      component: HomeComponent
  },
  {
      path: 'messages', 
      component: MessagesComponent
  },
  {
      path: 'messages/:name', 
      component: MessagesComponent
  },
  {
      path: 'messages/:id', 
      component: MessagesComponent
  },
  {
      path: 'newmessages', 
      component: NewMessageComponent
  },
  {
      path: 'register', 
      component: RegisterComponent
  },
  {
      path: 'login', 
      component: LoginComponent
  },
  {
      path: 'user', 
      component: UserComponent
  }
];

@NgModule({
  imports: [ 
  		BrowserModule, 
  		MaterialModule, 
  		BrowserAnimationsModule,
  		HttpModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forRoot(routes)
  	],
  declarations: [ 
  		AppComponent, 
  		MessagesComponent,
      NewMessageComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      LoginComponent,
      UserComponent
  	],
  bootstrap:    [ AppComponent ],
  providers: [
  		WebService,
      AuthService
  ]

})
export class AppModule { }
