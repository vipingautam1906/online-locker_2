import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './authentication.service';
import { AuthRoutingModule } from './auth-routing.module';
import { UserFormComponent } from "./user/user-form/user-form.component";
import { UserListComponent } from "./user/list/user-list.component";
import { UserService } from "./user/user.service";

@NgModule({
	declarations: [
		LoginComponent,
        UserFormComponent,
        UserListComponent,
    ],
	imports: [
		SharedModule,
		AuthRoutingModule,
	],
	providers: [
		AuthenticationService,
        UserService,
	]
})
export class AuthModule {
}
