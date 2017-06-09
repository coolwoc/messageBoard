import { Component } from '@angular/core';
import { WebService } from '../_providers/web.service';
import { AuthService } from '../_providers/auth.service';

@Component({
    moduleId: module.id,
    selector: 'new-message',
    templateUrl: 'new-message.component.html',
    styleUrls: ['new-message.component.css']
})
export class NewMessageComponent {

	constructor(private webService: WebService, private auth: AuthService) {}

    message = {
        owner: this.auth.name,
        text: ''
    }

    post() {
        this.webService.postMessage(this.message);
        this.message.text = ' ';
    }

}