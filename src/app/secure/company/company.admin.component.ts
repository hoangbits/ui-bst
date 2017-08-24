import {Company} from './index';
import {CompanyService} from './company.service';

import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';

@Component({
	selector: 'company-modal-content',
	templateUrl: './company.admin.modal.html',
	providers: [CompanyService]
})

export class CompanyAdminComponent implements OnInit  {
	adminCompanyFom: FormGroup;
	submitted: boolean;

	errorMsg: string;

	title: string;
	isEditName: boolean;
	company: Company;
	protected searchUser: string;

	dropdownList = [
		{id: 1, itemName: 'namnn'},
		{id: 2, itemName: 'b namnn 32'},
		{id: 3, itemName: 'c namnn 33'},
		{id: 4, itemName: 'd namnn 34'},
		{id: 5, itemName: 'e namnn 3'},
		{id: 6, itemName: 'f namnn 3'},
		{id: 7, itemName: 'g namnn 3'},
		{id: 8, itemName: 'h namnn 3'},
		{id: 8, itemName: 'i namnn 3'},
		{id: 10, itemName: 'k namnn 3'},
		{id: 11, itemName: 'l namnn 3'},
	];
	selectedItems = [];
	dropdownSettings = {};

	constructor(public bsModalRef: BsModalRef,
	            private companyService: CompanyService,
	            private fb: FormBuilder) {
	}

	ngOnInit() {
		this.loadUsers();

		this.dropdownSettings = {
			singleSelection: true,
			text: 'Select Users',
			enableSearchFilter: true,
			classes: 'myclass custom-class'
		};

		this.createForm();
	}

	createForm() {
		this.adminCompanyFom = this.fb.group({
			users: ''
		});
	}

	loadUsers() {
		this.companyService.getUsersAdminCompany(1).subscribe(
			users => {
				if (!users) {
					return;
				}
			},
			err => {
				console.log(err);
			});
	}

	saveClose() {
		this.submitted = true;
	}
}