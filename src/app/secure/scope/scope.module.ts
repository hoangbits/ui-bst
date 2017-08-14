import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataTableModule} from "angular2-datatable";
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import {PaginationModule} from 'ngx-bootstrap';

import { ScopeComponent, ScopeModalEditComponent } from './index';
import { ScopeRouting } from './scope.routing';

@NgModule({
	declarations: [
		ScopeComponent,
		ScopeModalEditComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		DataTableModule,
		PaginationModule,
		ReactiveFormsModule,
		AngularMultiSelectModule,
		ScopeRouting,
	],
	entryComponents: [
		ScopeModalEditComponent
	]
})

export class ScopeModule {}