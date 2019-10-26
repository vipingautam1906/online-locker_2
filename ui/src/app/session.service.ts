import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class SessionService {

	constructor(private httpClient: HttpClient) {
	}

	saveAllTokens(e) {
		localStorage.setItem('access_token', e.accessToken);
	}

	isAuthenticated(): boolean {
		return !!localStorage.getItem('access_token');
	}

	getAccessToken() {
		return localStorage.getItem('access_token');
	}

	deleteTokens() {
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
	}
}
