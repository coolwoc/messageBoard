import { Component } from '@angular/core';
import { AuthService } from '../_providers/auth.service';

@Component({
	moduleId: module.id,
    selector: 'nav',
    templateUrl: 'nav.component.html',
    styleUrls: ['nav.component.css']
})
export class NavComponent {
    constructor(private auth: AuthService) {}
}