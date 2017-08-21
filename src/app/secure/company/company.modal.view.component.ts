import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';

import {Company} from './index';
import {CompanyService} from './company.service';
import {Form, FormControl} from '@angular/forms';

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

	currentPage: number = 1;
	itemsPerPage: number = 10;
	indexPage: number = 0;
	totalItems: number = 0;
	searchText: string = '';

	hdCompany: FormControl;

	constructor(public bsModalRef: BsModalRef,
							private companyService: CompanyService) {
		this.company = this.company || new Company();

	}

	ngOnInit() {
		this.hdCompany = new FormControl();
		this.hdCompany.valueChanges.subscribe(data=>{
			this.loadUsers();
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