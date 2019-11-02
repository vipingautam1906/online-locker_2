import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {DashboardComponent} from "./dashboard.component";
import {FileService} from "./file.service";

@NgModule({
	declarations: [
		DashboardComponent,
    ],
	imports: [
		SharedModule,
		DashboardRoutingModule,
	],
	providers: [
		FileService,
    ]
})
export class DashboardModule {
}
