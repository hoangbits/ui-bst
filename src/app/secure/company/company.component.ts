import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MdDialog } from '@angular/material';
import { AlertDialog } from '../dialog/alert.dialog.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ToastrService } from 'ngx-toastr';
import {
	Company, CompanyModalEditComponent,
	CompanyModalViewComponent, CompanyAdminComponent, CompanyModalAddComponent
} from './index';
import { CompanyService } from './company.service';
import * as _ from "lodash";
import { Router } from '@angular/router';


@Component({
	selector: 'app-company',
	templateUrl: './company.component.html',
	styleUrls: ['./company.component.css'],
	providers: [CompanyService]
})
export class CompanyComponent implements OnInit {
	bsModalRef: BsModalRef;
	companies: any[];
	searchText: string = '';

	// Pagination setting
	currentPage: number = 1;
	itemsPerPage: number = 10;
	indexPage: number = 0;
	totalItems: number = 0;

	constructor(private companyService: CompanyService,
		private modalService: BsModalService,
		private dialog: MdDialog,
		private router: Router,
		private toastr: ToastrService) {
		
	}

	ngOnInit() {
		this.loadCompanies();
	}

	addNewComapny() {
		this.openModalAdd('New Company');
	}

	updateCompany(company: Company) {
		this.openModal('Update Company', false, company);
	}

	viewCompany(company: Company) {
		this.openModalView('View Company', true, company);
	}

	configAdmin(company: Company) {
		this.openModalAdminView('Config Admin Company', true, company);
	}

	openModalAdminView(title, viewMode, data?: Company) {
		this.bsModalRef = this.modalService.show(CompanyAdminComponent, { class: 'admin-company-modal' });
		this.bsModalRef.content.title = title;
		this.bsModalRef.content.companyId = data.id;
		this.bsModalRef.content.viewMode = viewMode;
	}


	openModal(title, viewMode, data?: Company) {
		this.bsModalRef = this.modalService.show(CompanyModalEditComponent, { class: 'modal-compny-edit' });
		this.bsModalRef.content.title = title;
		this.bsModalRef.content.company = data;
		this.bsModalRef.content.viewMode = viewMode;

    this.modalService.onHide.observers = [];
		this.modalService.onHide.subscribe((result) => {
			if(result){
				this.loadCompanies();
				this.toastr.success('Company is updated successfully!', 'Success!');
			}
		});
	}

	openModalAdd(title) {		
		this.bsModalRef = this.modalService.show(CompanyModalAddComponent);
		this.bsModalRef.content.title = title;
    this.modalService.onHide.observers = [];
		this.modalService.onHide.subscribe((result) => {
			if(result){
				this.loadCompanies();
				this.toastr.success('Company is created successfully!', 'Success!');
			}
		});
	}

	openModalView(title, viewMode, data?: Company) {
		this.bsModalRef = this.modalService.show(CompanyModalViewComponent, { class: 'second' });
		this.bsModalRef.content.title = title;
		this.bsModalRef.content.company = data;
	}

	loadCompanies() {
		this.companyService.getCompanies(this.searchText, this.itemsPerPage, this.currentPage).subscribe(
			result => {
				this.companies = result.companies;
				this.totalItems = result.meta.paginate.totalCount;
			});
	}

	refresh() {
		this.searchText = '';
		this.loadCompanies();
	}

	search() {
		this.loadCompanies();
	}

	pageChanged(event: any): void {
		this.currentPage = event.page;
		this.indexPage = this.currentPage > 1 ? (this.currentPage - 1) * this.itemsPerPage : 0;
		this.loadCompanies();
	}

	public confirmDialog(id) {
		this.dialog.open(AlertDialog, {
			width: '400px', height: '170px', data: {
				title: 'Confirm dialog', message: 'Are you sure you want to delete this item?'
			}
		}).afterClosed().subscribe(result => {
			if (result === 'OK') {
				this.companyService.removeCompany(id).subscribe(() => {
					this.toastr.success('Delete company successfully!', 'Success!');
					this.loadCompanies();					
				});
			}
		});
	}
}
