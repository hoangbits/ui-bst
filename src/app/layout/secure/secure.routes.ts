import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from './../../secure/company';
import { UserComponent } from './../../secure/user';
import { RoleComponent } from './../../secure/role';
import { ScopeComponent } from './../../secure/scope';

export const SECURE_ROUTES:Routes = [
    {path: 'company', component: CompanyComponent},
    {path: 'user', component: UserComponent},
    {path: 'role', component: RoleComponent},
    {path: 'scope', component: ScopeComponent},
];
