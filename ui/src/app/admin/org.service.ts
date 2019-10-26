import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Organization } from '../models/org/org';

@Injectable()
export class OrgService {

	constructor(private httpClient: HttpClient) {
	}

	getAll(): Observable<any> {
		return this.httpClient.get('/api/organizations');
	}

	save(org: Organization): Observable<any> {
		return this.httpClient.post('/api/organizations', org);
	}

	update(org: Organization): Observable<any> {
		return this.httpClient.put('/api/organizations', org);
	}

	get(orgId: string): Observable<any> {
		return this.httpClient.get('/api/organizations/' + orgId);
	}
}
