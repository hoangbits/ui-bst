import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import {PaginationModule, TooltipModule} from 'ngx-bootstrap';

import { ScopeComponent, ScopeModalEditComponent } from './index';

@NgModule({
	declarations: [
		ScopeComponent,
		ScopeModalEditComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		PaginationModule,
		TooltipModule.forRoot(),
		ReactiveFormsModule,
		AngularMultiSelectModule,
	],
	entryComponents: [
		ScopeModalEditComponent
	]
})

export class ScopeModule {}