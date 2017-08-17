import {Component, OnInit} from '@angular/core';
import {MdDialog} from '@angular/material';
import {AlertDialog} from '../dialog/alert.dialog.component';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {Company, CompanyModalEditComponent} from './index';
import {CompanyService} from './company.service';
import * as _ from "lodash";

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
	currentPage: number = 0;
	itemsPerPage: number = 10;
	totalItems: number = 0;

	constructor(private companyService: CompanyService,
							private modalService: BsModalService,
							private dialog: MdDialog) {
	}

	ngOnInit() {
		this.loadCompanies();
	}

	addNewComapny() {
		this.openModal('Add new Company', false, new Company());
	}

	updateCompany(company: Company) {
		this.openModal('Update Company', false, company);
	}

	viewCompany(company: Company) {
		this.openModal('View Company', true, company);
	}

	openModal(title, viewMode, data?: Company) {

		this.bsModalRef = this.modalService.show(CompanyModalEditComponent);
		this.bsModalRef.content.title = title;
		this.bsModalRef.content.company = data;
		this.bsModalRef.content.viewMode = viewMode;

		this.modalService.onHide.subscribe(() => {
			this.loadCompanies();
		});
	}

	loadCompanies() {
		this.companyService.getCompanies(this.searchText, this.itemsPerPage, this.currentPage).subscribe(
			result => {
				this.companies = result.companies;
				this.totalItems = result.meta.paginate.totalCount;
			},
			err => {
				this.dialog.open(AlertDialog, {
					width: '500px', height: '170px', data: {
						title: 'Information dialog', message: 'No data found.'
					}
				});
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
					this.loadCompanies();
				});
			}
		});
	}
}
