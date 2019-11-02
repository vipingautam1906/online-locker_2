import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from "./dashboard.component";
import {UserFormComponent} from "../admin/user/user-form/user-form.component";
import {UserListComponent} from "../admin/user/list/user-list.component";

const routes: Routes = [
	{path: 'dashboard', component: DashboardComponent},
    {path: 'users', component: UserListComponent},
    {path: 'users/add', component: UserFormComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class DashboardRoutingModule {
}
