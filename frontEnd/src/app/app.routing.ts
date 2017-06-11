import { Routes, RouterModule } from '@angular/router';

import { NavComponent } from './header/nav.component';
import { NewMessageComponent } from './newMessages/new-message.component';
import { MessagesComponent } from './messages/messages.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const appRoutes: Routes = [
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
	},
	{
		path: 'dashboard',
		component: DashboardComponent
	}
];

export const routing = RouterModule.forRoot(appRoutes);