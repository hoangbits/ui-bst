import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent, ProductService, ProductModalEditComponent } from './index';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule, TooltipModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    TooltipModule,
  ],
  providers: [ProductService],
  declarations: [ProductComponent, ProductModalEditComponent],
  entryComponents: [
    ProductModalEditComponent
  ]
})
export class ProductModule { }
