import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/org/user';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {

	constructor(private httpClient: HttpClient) {
	}

	getAll(): Observable<any> {
		return this.httpClient.get('/secured/users');
	}

	save(user: User): Observable<any> {
		return this.httpClient.post('/secured/users', user);
	}

	update(user: User): Observable<any> {
		return this.httpClient.put('/secured/users', user);
	}

	get(userId: string): Observable<User> {
		return this.httpClient.get('/secured/users/' + userId)
			.pipe(map(r => new User(r)));
	}
}
