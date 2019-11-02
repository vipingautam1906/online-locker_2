import {Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../auth/authentication.service';
import { SessionService } from '../../session.service';

@Component({
	selector: 'app-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {

    @Input() isAuthenticated: boolean = true;

	constructor(
		private router: Router,
		private authService: AuthenticationService,
		private sessionService: SessionService,
	) {
	}

	go(url: string) {
		this.router.navigate([url]);
	}

	doLogout() {
		this.authService.doLogout().subscribe((e) => {
			this.sessionService.deleteTokens();
			this.router.navigate(['login']);
		});
	}
}
