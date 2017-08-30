import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CompanyModalViewComponent, CompanyService} from './../../secure/company';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';

@Component({
	selector: 'app-secure',
	templateUrl: './secure.component.html',
	styleUrls: ['./secure.component.css'],
	providers: [CompanyService]
})
export class SecureComponent implements OnInit {

	bsModalRef: BsModalRef;
	sideBar: any[] = [
		{name: 'Company', url: '/admin/company', icon: 'fa-building-o'},
		{name: 'User', url: '/admin/user', icon: 'fa-user'},
		{name: 'Role', url: '/admin/role', icon: 'fa-files-o'},
		{name: 'Scope', url: '/admin/scope', icon: 'fa-th'},
		{name: 'Permission', url: '/admin/activity', icon: 'fa-bus'},
	];

	constructor(router: Router,
							private modalService: BsModalService,
							private companyService: CompanyService) {
	}

	ngOnInit() {
	}

	openModal() {
		let user = JSON.parse(localStorage.getItem('currentUser')) || '599a9eeb756032a43b19f693';
		this.companyService.getCompanyByUser(user).subscribe(data => {
			this.bsModalRef = this.modalService.show(CompanyModalViewComponent, {class: 'second'});
			this.bsModalRef.content.title = 'View company';
			this.bsModalRef.content.isProfile = true;
			this.bsModalRef.content.company = data[0].company;
		},
			err=>{
				this.bsModalRef = this.modalService.show(CompanyModalViewComponent, {class: 'second'});
				this.bsModalRef.content.title = 'View company';
				this.bsModalRef.content.company = {};
			})

	}
}
