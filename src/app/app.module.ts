import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app.routing';
import {HttpModule, JsonpModule} from '@angular/http';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import {NgxAdminLteModule} from 'ngx-admin-lte';
import {ModalModule, BsModalService, PaginationModule} from 'ngx-bootstrap';

import {AppComponent} from './app.component';
import {SecureComponent} from './layout/secure';
import {ScopeComponent, ScopeModalEditComponent} from './secure/scope';
import {CompanyComponent} from './secure/company';
import {ListRoleComponent, EditRoleComponent} from './secure/role';
import {ListUserComponent, EditUserComponent, CreateUserComponent} from './secure/user';
import {CommonModule} from '@angular/common';
import {DataTableModule} from 'angular2-datatable';
import {AlertDirective} from './directives/alert.directive';

@NgModule({
  declarations: [
    AppComponent,
    SecureComponent,
    ScopeComponent,
    CompanyComponent,
    ScopeModalEditComponent,
    ListRoleComponent,
    EditRoleComponent,
    ListUserComponent,
    EditUserComponent,
    CreateUserComponent,
    AlertDirective,
  ],
  imports: [
    BrowserModule, PaginationModule.forRoot(),
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule, JsonpModule,
    AngularMultiSelectModule,
    NgxAdminLteModule,
    ModalModule.forRoot(), ReactiveFormsModule,
    DataTableModule
  ],
  providers: [BsModalService],
  bootstrap: [AppComponent],
  entryComponents: [
    ScopeModalEditComponent, EditRoleComponent, CreateUserComponent, EditUserComponent
  ]
})
export class AppModule {
}
