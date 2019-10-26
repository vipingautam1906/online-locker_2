import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DecisionTakerComponent } from './decision/decision-taker/decision-taker.component';
import { FooterComponent } from './decision/footer/footer.component';
import { TopbarComponent } from './decision/topbar/topbar.component';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuardService } from './auth-guard.service';
import { SessionService } from './session.service';
import { SharedModule } from './_shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { HttpInterceptorService } from './http-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastService } from './toast.service';
import { MessageService } from 'primeng/api';
import { CacheService } from './cache.service';
import { ToastModule } from 'primeng/toast';

@NgModule({

	declarations: [
		AppComponent,
		DecisionTakerComponent,
		TopbarComponent,
		FooterComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,

		SharedModule,
		AuthModule,
		AdminModule,
		AppRoutingModule,

		ToastModule,
	],
	providers: [
		AuthGuardService,
		SessionService,
		HttpInterceptorService,
		CacheService,
		MessageService,
		ToastService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpInterceptorService,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
