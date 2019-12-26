import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { SessionService } from '../../session.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	constructor(
		private authService: AuthenticationService,
		private sessionService: SessionService,
		private router: Router
	) {}
	ngOnInit() {
		this.loginForm = new FormGroup({
			email: new FormControl(''),
			password: new FormControl(''),
		});
	}
	doLogin() {
		const val = this.loginForm.value;
		this.authService.doLogin(val.email, val.password).subscribe((e) => {
			this.sessionService.saveAllTokens(e);
			this.router.navigate(['dashboard']);
		}, (err) => {
		  console.error('some ex occured' + err);

		});
	}
	go(url: string) {
		this.router.navigate([url]);
	}
}
