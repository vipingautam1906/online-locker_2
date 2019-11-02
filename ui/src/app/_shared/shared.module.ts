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
];

const SharedComponents = [
];

@NgModule(
	{
		declarations: [
			...SharedComponents,
		],
		imports: [
			...AngularModules,
            ...PrimeNGModules,
        ],
		exports: [
			...AngularModules,
			...PrimeNGModules,
			...SharedComponents,
		]
	})
export class SharedModule {
}
