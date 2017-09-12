import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {Product} from './index';
import {ProductService} from './product.service';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'product-modal-content',
  templateUrl: './product.modal.edit.html',
  providers: [ProductService]
})
export class ProductModalEditComponent implements OnInit {
  title: string;
  product: Product;
  errorMsg: string;
  isSubmited: boolean;
  isView: boolean = false;
  fg: FormGroup;

  constructor(public bsModalRef: BsModalRef,
              private productService: ProductService,
              private modalService: BsModalService,
              private fb: FormBuilder) {
    this.product = this.product || new Product();
    this.createForm();
  }

  ngOnInit() {

  }

  createForm() {
    this.fg = this.fb.group({
      productTitle: new FormControl('', Validators.required),
      shippingInfo: new FormControl('', Validators.required),
      description: '',
      price:'',
      sku: new FormControl('', Validators.required)
    });
  }

  saveClose() {
    this.isSubmited = true;
    if (!this.fg.valid) {
      return;
    }

    if (!this.product.id) {
      this.add();
    }
    else {
      this.save();
    }
  }

  private save() {
    this.productService.updateProduct(this.product).subscribe(data => {
        if (data) {
          this.modalService.setDismissReason('Yes');
          this.bsModalRef.hide();
        }
        else {
          this.errorMsg = 'Update failed';
        }
      },
      err => {
        this.errorMsg = err;
      });
  }

  private add() {
    this.productService.addProduct(this.product).subscribe(data => {
        if (data) {
          this.modalService.setDismissReason('Yes');
          this.bsModalRef.hide();
        }
        else {
          this.errorMsg = 'Insert failed';
        }
      },
      err => {
        this.errorMsg = err;
      });
  }
}