import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ListUserCompanyComponent} from './index';

const routes: Routes = [
  { path: 'admin/companyUser', component: ListUserCompanyComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})

export class UserCompanyRouting {
}
