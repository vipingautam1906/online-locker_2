import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../auth/authentication.service';
import { SessionService } from '../../session.service';

@Component({
	selector: 'app-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

	constructor(
		private router: Router,
		private authService: AuthenticationService,
		private sessionService: SessionService,
	) {
	}

	ngOnInit() {
	}

	go(url: string) {
		this.router.navigate([url]);
	}

	doLogout() {
		this.authService.doLogout().subscribe((e) => {
			console.log('finnally ' + e);
			this.sessionService.deleteTokens();
			this.router.navigate(['login']);

		});
	}
}
