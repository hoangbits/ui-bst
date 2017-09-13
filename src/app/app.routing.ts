import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecureComponent, SECURE_ROUTES } from './layout/secure';
import { PublicComponent, PUBLIC_ROUTES } from './layout/public';

import { AuthGuard } from './guards/index';
/**
 * Route constant
 */
const routes: Routes = [
 { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', redirectTo: 'admin/company', pathMatch: 'full' },
	//{ path: '', component: SecureComponent, data: { title: 'Secure Views' }, children: SECURE_ROUTES, canActivateChild: [AuthGuard] },
	{ path: '', component: SecureComponent, data: { title: 'Secure Views' }, children: SECURE_ROUTES},
  { path: '', component: PublicComponent, data: { title: 'Public Views' }, children: PUBLIC_ROUTES },
  { path: '**', redirectTo: '' }
];

/**
 * App routing module
 */
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: false })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
