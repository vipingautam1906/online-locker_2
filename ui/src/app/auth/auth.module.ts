import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './authentication.service';
import { AuthRoutingModule } from './auth-routing.module';
import { PracticeComponent } from './practice/practice.component';

@NgModule({
	declarations: [
		LoginComponent,
		PracticeComponent,
	],
	imports: [
		SharedModule,
		AuthRoutingModule,
	],
	providers: [
		AuthenticationService,
	]
})
export class AuthModule {
}
