import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';
import { OrgService } from './org.service';
import { AdminRoutingModule } from './admin-routing.module';
import { UserFormComponent } from './user/user-form/user-form.component';
import { AddUserComponent } from './user/add/add-user.component';
import { EditUserComponent } from './user/edit/edit-user.component';
import { UserListComponent } from './user/list/user-list.component';
import { UserService } from './user/user.service';

@NgModule({
	declarations: [
		// user related,
		UserFormComponent,
		AddUserComponent,
		EditUserComponent,
		UserListComponent,

	],
	imports: [
		SharedModule,
		AdminRoutingModule,
	],
	providers: [
		OrgService,
		UserService,
	]
})
export class AdminModule {
}
