import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PaginationModule, TooltipModule} from 'ngx-bootstrap';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { CompanyComponent, CompanyModalEditComponent,
	CompanyModalViewComponent, CompanyService,
	CompanyAdminComponent, CompanyModalAddComponent
} from './index';

@NgModule({
	declarations: [
		CompanyComponent,
		CompanyModalEditComponent,
		CompanyModalViewComponent,
		CompanyAdminComponent,
		CompanyModalAddComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		PaginationModule,
		TooltipModule.forRoot(),
		ToastModule.forRoot(),
		ReactiveFormsModule,
		AngularMultiSelectModule
	],
	providers:[CompanyService],
	entryComponents: [
		CompanyModalEditComponent,
		CompanyModalViewComponent,
		CompanyAdminComponent,
		CompanyModalAddComponent
	]
})

export class CompanyModule {}