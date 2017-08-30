import {CompanyService} from './company.service';

import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import * as _ from 'lodash';

@Component({
	selector: 'company-modal-content',
	templateUrl: './company.admin.modal.html',
	providers: [CompanyService]
})

export class CompanyAdminComponent implements OnInit  {
	fg: FormGroup;
	submitted: boolean;
	admins: any[];
	users: any[];
	adminsChange: any[];
	errorMsg: string;
	isEditName: boolean;
	companyId: string;
	searchText: string = '';
	adminCompanyForm: FormGroup;
	hdCompany: FormControl;

	constructor(public bsModalRef: BsModalRef,
	            private companyService: CompanyService,
	            private formBuilder: FormBuilder) {
		
		this.users = [];
		this.createForm();
	}

	ngOnInit() {
		this.hdCompany = new FormControl();  
		this.hdCompany.valueChanges.subscribe(
			data => {
				this.loadAdmins(data);
			}
		);
	}

	createForm() {
		this.adminCompanyForm = this.formBuilder.group({
			users: ["", [Validators.required] ],
		});
	}

	loadAdmins(companyId) {
		if (companyId) {
			this.companyId = companyId;
			this.companyService.getUsersAdminCompany(companyId).subscribe(
				adminsFound => {
					if (!adminsFound) {
						return;
					}
					this.adminsChange = adminsFound;
					this.admins = adminsFound;
				},
				err => {
				}
			);
		}		
	}

	searchUserByCompany() {
		if (!this.searchText || this.searchText.trim() === '') {
			return false;
		}
		this.companyService.searchUserByName(this.companyId, this.searchText).subscribe(
			data => {
				if (!data || data.length === 0) {
					this.errorMsg = 'user not found';
					this.users = [];
					return;
				}
				this.errorMsg = '';
				this.users = data;
				_.each(this.admins, (admin) => {
					_.remove(this.users, (user) => {
						return admin.id === user.id;
					});
				});
			},
			err => {
				this.errorMsg = 'user not found';
			}
		);
	}

	deleteAdmins(userId) {
		_.remove(this.admins, function(admin) {
			return admin.id === userId;
		});
	}

	addAdmin(user) {
		this.admins.push(user);
		_.remove(this.users, function(userFind) {
			return user.id === userFind.id;
		});
	}

	saveClose() {
		let company = {
			id: this.companyId,
			admins: this.admins
		};
		this.companyService.UpdateAdminCompany(company).subscribe(
			company => {
				if (!company) {
					return;
				}
			}
		);
	}
}
