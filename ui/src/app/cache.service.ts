import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class CacheService {

	private cache: Map<string, any> = new Map();

	constructor(private httpClient: HttpClient) {
	}

	getIndustryTypes() {
		const url = '/api/types/industry';
		return this.checkFetchSaveAndGet(url);
	}

	getFunnelStages() {
		const url = '/api/types/funnelPosition';
		return this.checkFetchSaveAndGet(url);
	}

	getTimingsForPriorities() {
		const url = '/api/types/timingForPriorities';
		return this.checkFetchSaveAndGet(url);
	}

	private checkFetchSaveAndGet(url: string) {
		if (this.cache.has(url)) {
			return of(this.cache.get(url));
		}
		return this.httpClient.get(url).pipe(
			tap(data => this.cache.set(url, data), error => console.log(error))
		);
	}
}
