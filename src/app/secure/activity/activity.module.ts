import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PaginationModule, TooltipModule} from 'ngx-bootstrap';

import {ActivityComponent, ActivityModalEditComponent, ActivityService} from './index';

@NgModule({
	declarations: [
		ActivityComponent,
		ActivityModalEditComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		PaginationModule,
		ReactiveFormsModule,
		TooltipModule.forRoot(),
	],
	providers: [ActivityService],
	entryComponents: [
		ActivityModalEditComponent
	]
})

export class ActivityModule {}