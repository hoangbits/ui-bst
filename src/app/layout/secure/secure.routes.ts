import {Routes} from '@angular/router';
import {CompanyComponent} from './../../secure/company';
import {ListRoleComponent} from '../../secure/role';
import {ListUserComponent} from '../../secure/user';
import {ScopeComponent} from './../../secure/scope';
import {ActivityComponent} from './../../secure/activity';
import {ProductComponent} from './../../secure/product';

export const SECURE_ROUTES: Routes = [
	{path: 'admin/company', component: CompanyComponent},
	{path: 'admin/user', component: ListUserComponent},
	{path: 'admin/role', component: ListRoleComponent},
	{path: 'admin/scope', component: ScopeComponent},
	{path: 'admin/activity', component: ActivityComponent},
	{path: 'admin/product', component: ProductComponent},
];
