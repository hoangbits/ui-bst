import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {EditUserComponent, CreateUserComponent, ListUserComponent} from './index';
import {UserRouting} from './user.routing';
import {DataTableModule} from 'angular2-datatable';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {ModalDirective} from 'ngx-bootstrap/modal/modal.component';
import {ModalModule, BsModalService, PaginationModule, TooltipModule} from 'ngx-bootstrap';
import {EqualValidatorDirective} from './equal-validator.directive';

@NgModule({
  declarations: [ListUserComponent, CreateUserComponent, EditUserComponent, EqualValidatorDirective],
  imports: [
    ModalModule.forRoot(),
    PaginationModule,
    TooltipModule,
    BrowserModule,
    FormsModule,
    UserRouting,
    DataTableModule
  ],
  entryComponents: [
    EditUserComponent, CreateUserComponent
  ]
})

export class UserModule {
}
