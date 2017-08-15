import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ListUserComponent} from './index';

const routes: Routes = [
  { path: 'admin/user', component: ListUserComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})

export class UserRouting {
}
