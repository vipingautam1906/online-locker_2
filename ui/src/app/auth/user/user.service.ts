import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {

	constructor(private httpClient: HttpClient) {
	}

	getAll(): Observable<any> {
		return this.httpClient.get('/public/users');
	}

	save(user: User): Observable<any> {
		return this.httpClient.post('/public/users', user);
	}
}
