import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app.routing';
import {HttpModule, JsonpModule} from '@angular/http';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import {NgxAdminLteModule} from 'ngx-admin-lte';
import {ModalModule, BsModalService} from 'ngx-bootstrap';

import {AppComponent} from './app.component';
import {SecureComponent} from './layout/secure';
import {ScopeComponent, ScopeModalEditComponent, ControlMessages} from './secure/scope';
import {UserComponent} from './secure/user';
import {RoleComponent} from './secure/role';
import {CompanyComponent} from './secure/company';
import {ActivityComponent, ActivityService, ActivityModalEditComponent} from './secure/activity';

@NgModule({
	declarations: [
		AppComponent,
		SecureComponent,
		ScopeComponent,
		UserComponent,
		RoleComponent,
		CompanyComponent,
		ScopeModalEditComponent,
		ControlMessages,
		ActivityComponent,
		ActivityModalEditComponent,
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
	],
	providers: [BsModalService, ActivityService],
	bootstrap: [AppComponent],
	entryComponents: [
		ScopeModalEditComponent,
		ActivityModalEditComponent
	]
})
export class AppModule {
}
