import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {EditUserComponent, CreateUserComponent, ListUserComponent} from './index';
import {UserRouting} from './user.routing';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {ModalDirective} from 'ngx-bootstrap/modal/modal.component';
import {ModalModule, BsModalService, PaginationModule, TooltipModule} from 'ngx-bootstrap';
import {EqualValidatorDirective} from './equal-validator.directive';
import { SearchUserComponent } from './search-user/search-user.component';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

@NgModule({
  declarations: [ListUserComponent, CreateUserComponent, EditUserComponent, EqualValidatorDirective, SearchUserComponent],
  imports: [
    ModalModule.forRoot(),
    PaginationModule,
    TooltipModule,
    BrowserModule,
    FormsModule,
    UserRouting,
    AngularMultiSelectModule
  ],
  entryComponents: [
    EditUserComponent, CreateUserComponent
  ]
})

export class UserModule {
}
