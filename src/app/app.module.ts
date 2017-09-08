import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app.routing';
import {HttpModule, JsonpModule} from '@angular/http';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {
	ModalModule,
	BsModalService,
	PaginationModule,
	TooltipModule
} from 'ngx-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdDialogModule, MdButtonModule} from '@angular/material';
import {AppComponent} from './app.component';
import {SecureComponent} from './layout/secure';
import { PublicComponent } from './layout/public';
//Public Component
import { LoginComponent } from './public/login';

import {ScopeModule} from './secure/scope'
import {RoleModule} from './secure/role';
import {UserModule} from './secure/user';
import {CompanyModule} from './secure/company';
import {ActivityModule} from './secure/activity';
import {ProductModule} from './secure/product';
import {AlertDialog} from './secure/dialog';
import { AuthGuard } from './guards/index';
import { CatalogModule } from './secure/catalog';


@NgModule({
	declarations: [
		AppComponent,
		SecureComponent,
		LoginComponent,
		SecureComponent,
		PublicComponent,
		AlertDialog,

	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule, JsonpModule,
		AngularMultiSelectModule,
		ModalModule.forRoot(),
		PaginationModule.forRoot(),
		TooltipModule.forRoot(),
		ToastModule.forRoot(),
		BrowserAnimationsModule,
		MdDialogModule,
		MdButtonModule,
		ScopeModule,
		ActivityModule,
		RoleModule,
		UserModule,
		CompanyModule,
		ProductModule,
		CatalogModule
	],
	providers: [
		BsModalService,
		AuthGuard
	],
	bootstrap: [AppComponent],
	entryComponents: [
		AlertDialog
	]
})
export class AppModule {
}
