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
import {ScopeModule} from './secure/scope'
import {RoleModule} from './secure/role';
import {UserModule} from './secure/user';
import {CompanyModule} from './secure/company';
import {ActivityModule} from './secure/activity';
import {AlertDialog} from './secure/dialog';

@NgModule({
	declarations: [
		AppComponent,
		SecureComponent,
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
		MdButtonModule,
		ScopeModule,
		ActivityModule,
		RoleModule,
		UserModule,
		CompanyModule
	],
	providers: [BsModalService],
	bootstrap: [AppComponent],
	entryComponents: [
		AlertDialog
	]
})
export class AppModule {
}
