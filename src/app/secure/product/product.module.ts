import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent, ProductService, ProductModalEditComponent } from './index';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from "angular2-datatable";
import { PaginationModule, TooltipModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
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
