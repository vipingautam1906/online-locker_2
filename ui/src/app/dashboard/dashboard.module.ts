import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {DashboardComponent} from "./dashboard.component";
import {FileService} from "./file.service";
import {UserFormComponent} from "../admin/user/user-form/user-form.component";
import {UserListComponent} from "../admin/user/list/user-list.component";
import {UserService} from "../admin/user/user.service";

@NgModule({
	declarations: [
		DashboardComponent,

        UserFormComponent,
        UserListComponent,

    ],
	imports: [
		SharedModule,
		DashboardRoutingModule,
	],
	providers: [
		FileService,
        UserService,
	]
})
export class DashboardModule {
}
