import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {
  SearchUserCompanyComponent,
  CreateUserCompanyComponent,
  ListUserCompanyComponent,
  EditViewAdminCompanyComponent
} from './index';
import {UserCompanyRouting} from './admin-company.routing';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {ModalDirective} from 'ngx-bootstrap/modal/modal.component';
import {ModalModule, BsModalService, PaginationModule, TooltipModule} from 'ngx-bootstrap';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import {UserShareModule} from '../../common/shareModule/user-share-module.module';
@NgModule({
  declarations: [SearchUserCompanyComponent,
    CreateUserCompanyComponent,
    ListUserCompanyComponent,
    EditViewAdminCompanyComponent],
  imports: [
    ModalModule.forRoot(),
    PaginationModule,
    TooltipModule,
    BrowserModule,
    FormsModule,
    UserCompanyRouting,
    AngularMultiSelectModule,
    UserShareModule
  ],
  entryComponents: [
    CreateUserCompanyComponent, EditViewAdminCompanyComponent
  ]
})

export class AdminCompanyModule {
}

