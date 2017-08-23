import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';

import {Company} from './index';
import {CompanyService} from './company.service';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
	selector: 'company-modal-content',
	templateUrl: './company.modal.view.html',
	styleUrls: ['./company.modal.view.css'],
	providers: [CompanyService]
})
export class CompanyModalViewComponent implements OnInit {
	title: string;
	company: Company;
	users: any;
	isProfile: boolean = false;
	isEdit: boolean = false;

	currentPage: number = 1;
	itemsPerPage: number = 5;
	indexPage: number = 0;
	totalItems: number = 0;
	searchText: string = '';

	hdCompany: FormControl;
	fg: FormGroup;
	isSubmited:boolean;

	constructor(public bsModalRef: BsModalRef,
							private companyService: CompanyService,
							private fb: FormBuilder) {
		this.company = this.company || new Company();

	}

	ngOnInit() {
		this.hdCompany = new FormControl();
		this.hdCompany.valueChanges.subscribe(data=>{
			this.loadUsers();
		});

		this.createForm();
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

	showEdit(){
		this.isEdit = !this.isEdit;
	}

	save() {
		this.isSubmited = true;
		if (this.fg.invalid) {
			return;
		}
		this.companyService.updateCompany(this.company).subscribe(data => {
				if (data) {
					this.isEdit = !this.isEdit;
				}
				else {
					//this.errorMsg = 'Update failed';
				}
			},
			err => {
				//this.errorMsg = err;
			});
	}

	loadUsers() {
		if(!this.company.id){
			return false;
		}

		this.companyService.getUsersByCompany(this.company.id, this.searchText, this.itemsPerPage, this.currentPage).subscribe(
			result => {
				this.users = result.users;
				this.totalItems = result.meta.paginate.totalCount;
			},
			err => {
				console.log(err);
			});
	}

	search(){
		this.loadUsers();
	}

	pageChanged(event: any): void {
		this.currentPage = event.page;
		this.indexPage = this.currentPage > 1 ? (this.currentPage - 1) * this.itemsPerPage : 0;
		this.loadUsers();
	}
}