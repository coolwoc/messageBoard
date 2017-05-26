import { Component } from '@angular/core';
import { MessagesComponent } from '../messages/messages.component';
import { NewMessageComponent } from '../newMessages/new-message.component';
import { NavComponent } from '../header/nav.component';
import { AuthService } from '../_providers/auth.service';


@Component({
	moduleId: module.id,
  	selector: 'home',
  	templateUrl: 'home.component.html'
})
export class HomeComponent  {}
