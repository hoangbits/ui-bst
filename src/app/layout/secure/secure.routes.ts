import {Routes} from '@angular/router';
import {CompanyComponent} from './../../secure/company';
import {ListRoleComponent} from '../../secure/role';
import {ListUserComponent} from '../../secure/user';
import {ScopeComponent} from './../../secure/scope';
import {ActivityComponent} from './../../secure/activity';

export const SECURE_ROUTES: Routes = [
	{path: 'company', component: CompanyComponent},
	{path: 'user', component: ListUserComponent},
	{path: 'role', component: ListRoleComponent},
	{path: 'scope', component: ScopeComponent},
	{path: 'activity', component: ActivityComponent},
];
