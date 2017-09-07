import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {EditUserComponent, CreateUserComponent, ListUserComponent} from './index';
import {UserRouting} from './user.routing';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {ModalDirective} from 'ngx-bootstrap/modal/modal.component';
import {ModalModule, BsModalService, PaginationModule, TooltipModule} from 'ngx-bootstrap';
import { SearchUserComponent } from './search-user/search-user.component';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

import {UserShareModule} from '../../common/shareModule/user-share-module.module';

@NgModule({
  declarations: [ListUserComponent, CreateUserComponent, EditUserComponent, SearchUserComponent],
  imports: [
    ModalModule.forRoot(),
    PaginationModule,
    TooltipModule,
    BrowserModule,
    FormsModule,
    UserRouting,
    AngularMultiSelectModule,
    UserShareModule
  ],
  entryComponents: [
    EditUserComponent, CreateUserComponent
  ]
})

export class UserModule {
}
