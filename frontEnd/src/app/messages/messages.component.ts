import { Component } from '@angular/core';
import { WebService } from '../_providers/web.service';
import { AuthService } from '../_providers/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'messages',
    templateUrl: 'messages.component.html'
})
export class MessagesComponent {

	constructor( private webService: WebService, private route: ActivatedRoute, private auth: AuthService ) {}

	ngOnInit() {
		var name = this.route.snapshot.params.name;
		this.webService.getMessages(name);
	}
}
