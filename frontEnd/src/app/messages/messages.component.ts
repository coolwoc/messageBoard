import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';

import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { WebService } from '../_providers/web.service';
import { AuthService } from '../_providers/auth.service';

@Component({
    moduleId: module.id,
    selector: 'messages',
    templateUrl: 'messages.component.html',
    styleUrls:['messages.component.css']
})
export class MessagesComponent {

	BASE_URL = 'http://localhost:63145/api';

	form: any;

	constructor( 
		private webService: WebService, 
		private route: ActivatedRoute, 
		private auth: AuthService,
		private fb: FormBuilder
	){}

	private editField: boolean;

	ngOnInit() {
		var name = this.route.snapshot.params.name;
		this.webService.getMessages(name);
		this.editField = false;
	}

	deleteMessage(id) {
		this.webService.deleteMessage(id);
	}

	editable() {
		this.editField = true;
	}

	update(message) {
		this.webService.updateMessage(message);
        this.editField = false;
	}

}
