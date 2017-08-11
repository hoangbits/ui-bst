import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app.routing';
import {HttpModule, JsonpModule} from '@angular/http';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import {NgxAdminLteModule} from 'ngx-admin-lte';
import {
	ModalModule,
	BsModalService,
	PaginationModule,
	TooltipModule
} from 'ngx-bootstrap';
import {DataTableModule} from "angular2-datatable";

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdDialogModule, MdButtonModule} from '@angular/material';

import {AppComponent} from './app.component';
import {SecureComponent} from './layout/secure';
import {ScopeComponent, ScopeModalEditComponent} from './secure/scope';
import {UserComponent} from './secure/user';
import {RoleComponent} from './secure/role';
import {CompanyComponent} from './secure/company';
import {ActivityComponent, ActivityService, ActivityModalEditComponent} from './secure/activity';
import {AlertDialog} from './secure/dialog';

@NgModule({
	declarations: [
		AppComponent,
		SecureComponent,
		ScopeComponent,
		UserComponent,
		RoleComponent,
		CompanyComponent,
		ScopeModalEditComponent,
		ActivityComponent,
		ActivityModalEditComponent,
		AlertDialog
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule, JsonpModule,
		AngularMultiSelectModule,
		NgxAdminLteModule,
		ModalModule.forRoot(),
		PaginationModule.forRoot(),
		TooltipModule.forRoot(),
		DataTableModule,
		BrowserAnimationsModule,
		MdDialogModule,
		MdButtonModule
	],
	providers: [BsModalService, ActivityService],
	bootstrap: [AppComponent],
	entryComponents: [
		ScopeModalEditComponent,
		ActivityModalEditComponent,
		AlertDialog
	]
})
export class AppModule {
}
