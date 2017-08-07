import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
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

@NgModule({
    declarations: [
        AppComponent,
        SecureComponent,
        ScopeComponent,
        UserComponent,
        RoleComponent,
        CompanyComponent,
        ScopeModalEditComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpModule, JsonpModule,
        AngularMultiSelectModule,
        NgxAdminLteModule,
        ModalModule.forRoot()
    ],
    providers: [BsModalService],
    bootstrap: [AppComponent],
    entryComponents: [
        ScopeModalEditComponent
    ]
})
export class AppModule {
}
