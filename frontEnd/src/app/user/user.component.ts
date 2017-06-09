import { Component } from '@angular/core';
import { WebService } from '../_providers/web.service';

@Component({
    moduleId: module.id,
    selector: 'user',
    templateUrl: 'user.component.html',
    styles: ['user.component.css']
})
export class UserComponent {

	constructor(private webService: WebService) {}

    model = {
        firstName: '',
        lastName: ''
    }

    // get User from Observable & subscribe to get data.
    ngOnInit() {
        this.webService.getUser().subscribe(res => {
            this.model.firstName = res.firstName;
            this.model.lastName = res.lastName;
        })
    }

    saveUser(userData) {
        this.webService.saveUser(this.model).subscribe();
    }

}