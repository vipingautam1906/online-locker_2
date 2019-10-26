import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
	providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

	constructor(private sessionService: SessionService) {
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		if (req.url !== '/oauth/token' &&
			!req.url.startsWith('/api/password')
		) {
			req = req.clone({
        setHeaders: {
          AccessToken: this.sessionService.getAccessToken()
        }
			});
		}

		return next.handle(req);
	}
}
