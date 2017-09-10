import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { PaginationModule, TooltipModule } from 'ngx-bootstrap';
import { HttpModule, JsonpModule } from '@angular/http';

import { CatalogComponent } from './index';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FiltersComponent } from './filters/filters.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';
import { ProductThumbnailComponent } from './product-thumbnail/product-thumbnail.component';
import { CartPreviewComponent } from './cart-preview/cart-preview.component';
import { DataShellComponent } from './data-shell/data-shell.component';
import { SortFiltersComponent } from './sort-filters/sort-filters.component';

import { DataService } from './data.service';
import { CartService } from './cart.service';
import { UrlFormComponent } from './url-form/url-form.component';

@NgModule({
	declarations: [
		CatalogComponent,
		SearchBarComponent,
		FiltersComponent,
		ShowcaseComponent,
		CartComponent,
		ProductComponent,
		ProductThumbnailComponent,
		CartPreviewComponent,
		DataShellComponent,
		SortFiltersComponent,
		UrlFormComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		PaginationModule,
		TooltipModule.forRoot(),
		ReactiveFormsModule,
		AngularMultiSelectModule,
		HttpModule,
		JsonpModule
	],
	providers: [
		DataService,
		CartService
	],
})

export class CatalogModule { }