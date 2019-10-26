import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PracticeComponent } from './practice/practice.component';

const routes: Routes = [
	{path: 'login', component: LoginComponent},
	{path: 'practice', component: PracticeComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AuthRoutingModule {
}
