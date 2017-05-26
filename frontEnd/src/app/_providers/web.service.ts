import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MdSnackBar } from '@angular/material';
import { AuthService } from '../_providers/auth.service';

@Injectable()
export class WebService {

	BASE_URL = 'http://localhost:63145/api';


	// we make observable and private the data
	// so we can make sure we do not access from 
	// other components
	private messageStore = [];

	private messageSubject = new Subject();

	messages = this.messageSubject.asObservable();

	constructor( private http:Http, private sb: MdSnackBar, private auth: AuthService ) {
		this.getMessages('');
	}

	getMessages(user) {

		user = (user) ? '/' + user : '';

		this.http.get(this.BASE_URL + '/messages' + user ).subscribe(response => {
			this.messageStore = response.json();
			this.messageSubject.next(this.messageStore);	
		}, error => {
			this.handleError('Unable to get any messages');	
		});
		
	}


	async postMessage(message) {
		try {
			var response = await this.http.post(this.BASE_URL + '/messages', message).toPromise();
			this.messageStore.push(response.json());
			this.messageSubject.next(this.messageStore);
		} catch(error) {
			this.handleError('Unable to post any message ' + error);
		}
	}

	getUser() {
		return this.http.get(this.BASE_URL + '/users/me', this.auth.tokenHeader).map(res => res.json());
	}

	saveUser( userData ) {
		return this.http.post(this.BASE_URL + '/users/me', userData, this.auth.tokenHeader).map(res => res.json());
	}

	private handleError(error) {
		this.sb.open( error, 'close', {duration: 2000});	
	}

}