import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { SecureComponent } from './layout/secure';
import { ScopeComponent } from './secure/scope';
import { UserComponent } from './secure/user';
import { RoleComponent } from './secure/role';
import { CompanyComponent } from './secure/company';

@NgModule({
  declarations: [
    AppComponent,
    SecureComponent,
    ScopeComponent,
    UserComponent,
    RoleComponent,
    CompanyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
