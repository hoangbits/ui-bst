import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {ModalDirective} from 'ngx-bootstrap/modal/modal.component';
import {ModalModule, BsModalService, PaginationModule, TooltipModule} from 'ngx-bootstrap';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

import {ListRoleComponent, EditRoleComponent} from './index';
import {RoleRouting} from './role.routing';


@NgModule({
	declarations: [
		ListRoleComponent,
		EditRoleComponent
	],
	imports: [
		ModalModule.forRoot(),
		BrowserModule,
		FormsModule,
		PaginationModule,
		TooltipModule,
		ReactiveFormsModule,
		AngularMultiSelectModule,
		RoleRouting
	],
	entryComponents: [
		EditRoleComponent
	]
})

export class RoleModule {
}
