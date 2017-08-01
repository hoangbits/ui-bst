import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecureComponent, SECURE_ROUTES } from './layout/secure';
/**
 * Route constant
 */
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', component: SecureComponent, data: { title: 'Secure Views' }, children: SECURE_ROUTES },
  { path: '**', redirectTo: '' }
];

/**
 * App routing module
 */
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
