import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ListRoleComponent} from './index';

const routes: Routes = [
  { path: 'admin/role', component: ListRoleComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})

export class RoleRouting {
}
