import { Component } from '@angular/core';
import { AuthService } from '../_providers/auth.service';

@Component({
	moduleId: module.id,
    selector: 'nav',
    templateUrl: 'nav.component.html',
    styles: [`
		.menu-divider {
    		flex: 1 1 auto;
    	}
    	.mat-button {
    		font-size: 16px;
    	}
    	.mat-button.isActive {
    		color: #ffff00;
    	}
  	`]
})
export class NavComponent {
    constructor(private auth: AuthService) {}
}