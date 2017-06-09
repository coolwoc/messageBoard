import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_providers/auth.service';

@Component({
	moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent {
    constructor(private auth: AuthService) { }

    loginData = {
        email: '',
        password: ''
    }

    login() {
        this.auth.login(this.loginData);
    }
}