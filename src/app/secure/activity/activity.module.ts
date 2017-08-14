import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataTableModule} from "angular2-datatable";
//import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import {PaginationModule} from 'ngx-bootstrap';

import {ActivityComponent, ActivityModalEditComponent, ActivityService} from './index';
import {ActivityRouting} from './activity.routing';

@NgModule({
	declarations: [
		ActivityComponent,
		ActivityModalEditComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		DataTableModule,
		PaginationModule,
		ReactiveFormsModule,
		//AngularMultiSelectModule,
		ActivityRouting,
	],
	providers: [ActivityService],
	entryComponents: [
		ActivityModalEditComponent
	]
})

export class ActivityModule {}