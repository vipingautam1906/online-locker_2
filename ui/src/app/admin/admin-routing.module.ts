import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user/list/user-list.component';
import { AddUserComponent } from './user/add/add-user.component';
import { EditUserComponent } from './user/edit/edit-user.component';

const routes: Routes = [
	{path: 'users', component: UserListComponent},
	{path: 'users/add', component: AddUserComponent},
	{path: 'users/edit/:userId', component: EditUserComponent},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule {
}
