import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserFormComponent } from "./user/user-form/user-form.component";
import { UserListComponent } from "./user/list/user-list.component";

const routes: Routes = [
	{path: 'login', component: LoginComponent},
    {path: 'users', component: UserListComponent},
    {path: 'users/add', component: UserFormComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AuthRoutingModule {
}
