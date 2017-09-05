import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PaginationModule, TooltipModule} from 'ngx-bootstrap';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

import { CompanyComponent, CompanyModalEditComponent,
	CompanyModalViewComponent, CompanyService,
	CompanyAdminComponent
} from './index';

@NgModule({
	declarations: [
		CompanyComponent,
		CompanyModalEditComponent,
		CompanyModalViewComponent,
		CompanyAdminComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		PaginationModule,
		TooltipModule.forRoot(),
		ReactiveFormsModule,
		AngularMultiSelectModule
	],
	providers:[CompanyService],
	entryComponents: [
		CompanyModalEditComponent,
		CompanyModalViewComponent,
		CompanyAdminComponent
	]
})

export class CompanyModule {}