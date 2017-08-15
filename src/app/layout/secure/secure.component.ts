import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
	selector: 'app-secure',
	templateUrl: './secure.component.html',
	styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {

	sideBar: any[] = [
		{name: 'Company', url: '/admin/company', icon: 'fa-building-o'},
		{name: 'User', url: '/admin/user', icon: 'fa-user'},
		{name: 'Role', url: '/admin/role', icon: 'fa-files-o'},
		{name: 'Scope', url: '/admin/scope', icon: 'fa-th'},
		{name: 'Activity', url: '/admin/activity', icon: 'fa-bus'},
	];

	constructor(router: Router) {
	}

	ngOnInit() {
	}

}
