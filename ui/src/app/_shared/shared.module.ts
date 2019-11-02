import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    AutoCompleteModule,
    ButtonModule,
    CalendarModule,
    CheckboxModule,
    ConfirmDialogModule,
    DropdownModule,
    FileUploadModule,
    GrowlModule,
    InputTextModule,
    PasswordModule,
    ProgressSpinnerModule,
    RadioButtonModule,
    SelectButtonModule,
    SidebarModule
} from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    ProgressSpinnerModule,
    FileUploadModule,
];

const SharedComponents = [
];

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
