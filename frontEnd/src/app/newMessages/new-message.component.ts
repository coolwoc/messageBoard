import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WebService } from '../_providers/web.service';
import { AuthService } from '../_providers/auth.service';

@Component({
    moduleId: module.id,
    selector: 'new-message',
    templateUrl: 'new-message.component.html',
    styleUrls: ['new-message.component.css']
})
export class NewMessageComponent {

	constructor (

        private webService: WebService, 
        private auth: AuthService,
        private router: Router 

    ) {}

    message = {
        owner: this.auth.name,
        text: ''
    }

    post() {

        this.webService.postMessage(this.message);
        this.message.text = ' ';

        // redirect page to messagesBoard
        this.router.navigate(['/messages']);
    }

}