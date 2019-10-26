import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PasswordReset } from '../models/org/password';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	constructor(private httpClient: HttpClient) {
	}

	doLogin(email: string, password: string): Observable<any> {
		const oauthTokenUrl = '/public/credentials/login';
		const body = {
			email: `${email}`,
			password: `${password}`
		};
		const httpHeaders: HttpHeaders = new HttpHeaders()
			.set('Content-Type', 'application/json');
		return this.httpClient.post(oauthTokenUrl, body, {headers: httpHeaders});
	}

	doLogout(): Observable<string> {
		return of('Then What');
	}

	// password related things.
	forgot(email: string) {
		return this.httpClient.post(`/api/password/forgot`, email);
	}

	getPasswordReset(prId: string): Observable<PasswordReset> {
		return this.httpClient.get(`/api/password/reset/${prId}`)
			.pipe(map(r => new PasswordReset(r)));
	}

	patchNewPassword(prId: string, password: string) {
		return this.httpClient.patch(`/api/password/reset/${prId}/newPassword`, password);
	}
}
