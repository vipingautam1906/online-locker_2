import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	AutoCompleteModule,
	ButtonModule,
	CalendarModule,
	CheckboxModule,
	ConfirmDialogModule,
	DropdownModule,
	GrowlModule,
	InputTextModule,
	PasswordModule,
	RadioButtonModule,
	SelectButtonModule,
	SidebarModule
} from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	CardComponent,
	CardDescriptionBodyComponent,
	CardDescriptionComponent, CardDescriptionFooterComponent, CardDescriptionHeaderComponent,
	CardSummaryBodyComponent,
	CardSummaryComponent, CardSummaryFooterComponent, CardSummaryHeaderComponent
} from './card/card.component';

const AngularModules = [
	CommonModule,
	ReactiveFormsModule,
	FormsModule,
];

const PrimeNGModules = [

	InputTextModule,
	PasswordModule,
	ButtonModule,
	CheckboxModule,
	RadioButtonModule,
	SelectButtonModule,

	DropdownModule,
	AutoCompleteModule,
	GrowlModule,
	ConfirmDialogModule,
	CalendarModule,
	SidebarModule,
];

const SharedComponents = [
	CardComponent,

	CardSummaryComponent,
	CardSummaryHeaderComponent,
	CardSummaryBodyComponent,
	CardSummaryFooterComponent,

	CardDescriptionComponent,
	CardDescriptionHeaderComponent,
	CardDescriptionBodyComponent,
	CardDescriptionFooterComponent,
]

@NgModule(
	{

		declarations: [
			...SharedComponents,
		],
		imports: [
			/* Angular Modules Importing */
			...AngularModules,

			/* PrimeNG Module Importing */
			...PrimeNGModules,

			/* App Specific Module Importing */
		],
		exports: [
			/* Angular Modules Exporting */
			...AngularModules,

			/* PrimgNG Modules Exporting */
			...PrimeNGModules,

			/* App Specific Components Exporting */
			...SharedComponents,
		]
	})
export class SharedModule {
}
