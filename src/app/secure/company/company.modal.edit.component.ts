import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';

import {Company} from './index';
import {CompanyService} from './company.service';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
	selector: 'company-modal-content',
	templateUrl: './company.modal.edit.html',
	providers: [CompanyService]
})
export class CompanyModalEditComponent implements OnInit  {
	title: string;
	company: Company;
	errorMsg: string;
	isSubmited: boolean;
	viewMode: boolean;
	fg: FormGroup;

	constructor(public bsModalRef: BsModalRef,
							private companyService: CompanyService,
							private fb: FormBuilder) {
		this.company = this.company || new Company();
		this.viewMode = this.viewMode || true;
		this.createForm();

	}

	ngOnInit() {

	}

	createForm(){
		this.fg = this.fb.group({
			companyName: new FormControl('', Validators.required),
			address: new FormControl('', Validators.required),
			taxCode: new FormControl('', Validators.required),
			phone:'',
			fax:''
		});
	}

	saveClose() {
		this.isSubmited = true;
		if (this.fg.invalid) {
			return;
		}

		if (!this.company.id) {
			this.add();
		}
		else {
			this.save();
		}
	}

	private save() {
		this.companyService.updateCompany(this.company).subscribe(data => {
				if (data) {
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
		this.companyService.addCompany(this.company).subscribe(data => {
				if (data) {
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