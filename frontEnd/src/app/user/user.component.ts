import { Component } from '@angular/core';
import { WebService } from '../_providers/web.service';

@Component({
    moduleId: module.id,
    selector: 'user',
    templateUrl: 'user.component.html',
    styles: [`
        .menu-divider {
            flex: 1 1 auto;
        }
        .mat-input-container {
            width: 100%;
        }
    `]
})
export class UserComponent {

	constructor(private webService: WebService) {}

    model = {
        firstName: '',
        lastName: ''
    }

    // gets user info from BE
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