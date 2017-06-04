import { Component } from '@angular/core';
import { AuthService } from '../_providers/auth.service';

@Component({
	moduleId: module.id,
    selector: 'nav',
    templateUrl: 'nav.component.html',
    styles: [`
    	.mat-button.isActive {
    		color: #ffff00;
    	}
    	.menu-divider {
    		flex: 1 1 auto;
    	}
  	`]
})
export class NavComponent {
    constructor(private auth: AuthService) {}
}