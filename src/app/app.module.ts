import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AppRoutingModule} from './app.routing';
import {HttpModule, JsonpModule} from '@angular/http';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import {NgxAdminLteModule} from 'ngx-admin-lte';
import {ModalModule, BsModalService} from 'ngx-bootstrap';

import {AppComponent} from './app.component';
import {SecureComponent} from './layout/secure';
import {ScopeComponent, ScopeModalEditComponent} from './secure/scope';
import {UserComponent} from './secure/user';
import {RoleComponent} from './secure/role';
import {CompanyComponent} from './secure/company';
import { ListRoleComponent } from './secure/role/list-role/list-role.component';
import { EditRoleComponent } from './secure/role/edit-role/edit-role.component';
import { ListUserComponent } from './secure/user/list-user/list-user.component';
import { EditUserComponent } from './secure/user/edit-user/edit-user.component';
import { CreateUserComponent } from './secure/user/create-user/create-user.component';

@NgModule({
  declarations: [
  AppComponent,
  SecureComponent,
  ScopeComponent,
  UserComponent,
  RoleComponent,
  CompanyComponent,
  ScopeModalEditComponent,
  ListRoleComponent,
  EditRoleComponent,
  ListUserComponent,
  EditUserComponent,
  CreateUserComponent,
  ],
  imports: [
  BrowserModule,
  AppRoutingModule,
  FormsModule,
  HttpModule, JsonpModule,
  AngularMultiSelectModule,
  NgxAdminLteModule,
  ModalModule.forRoot(), ReactiveFormsModule
  ],
  providers: [BsModalService],
  bootstrap: [AppComponent],
  entryComponents: [
  ScopeModalEditComponent, EditRoleComponent,CreateUserComponent,EditUserComponent
  ]
})
export class AppModule {
}
