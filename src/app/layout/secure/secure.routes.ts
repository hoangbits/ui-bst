import {Routes} from '@angular/router';
import {CompanyComponent} from './../../secure/company';
import {UserComponent} from './../../secure/user';
import {ListRoleComponent} from '../../secure/role/list-role/list-role.component';
import {ListUserComponent} from '../../secure/user/list-user/list-user.component';
import {ScopeComponent} from './../../secure/scope';

export const SECURE_ROUTES: Routes = [
    {path: 'company', component: CompanyComponent},
    {path: 'user', component: ListUserComponent},
    {path: 'role', component: ListRoleComponent},
    {path: 'scope', component: ScopeComponent},
];
