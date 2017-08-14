import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ActivityComponent} from './index';

const routes: Routes = [
	{ path: 'admin/activity', component: ActivityComponent },
];

@NgModule({
	imports: [ RouterModule.forChild(routes)],
	exports: [ RouterModule ]
})

export class ActivityRouting { }