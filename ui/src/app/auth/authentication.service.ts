import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from "../session.service";

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	constructor(private httpClient: HttpClient,
                private sessionService: SessionService) {
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

	doLogout(): Observable<any> {
		return this.httpClient.delete('/public/credentials/logout/' +
            this.sessionService.getAccessToken());
	}
}
