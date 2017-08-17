import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataTableModule} from "angular2-datatable";
import {PaginationModule, TooltipModule} from 'ngx-bootstrap';
import {MdProgressSpinnerModule} from '@angular/material';

import { CompanyComponent, CompanyModalEditComponent, CompanyService } from './index';

@NgModule({
	declarations: [
		CompanyComponent,
		CompanyModalEditComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		DataTableModule,
		PaginationModule,
		TooltipModule.forRoot(),
		ReactiveFormsModule,
		MdProgressSpinnerModule
	],
	providers:[CompanyService],
	entryComponents: [
		CompanyModalEditComponent
	]
})

export class CompanyModule {}