import {LoginComponent} from './../../public/login';
import {Routes} from '@angular/router';
import {CatalogComponent} from './../../public/catalog'

export const PUBLIC_ROUTES: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'catalog', component: CatalogComponent},
];
