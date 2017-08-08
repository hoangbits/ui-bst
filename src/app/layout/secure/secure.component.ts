import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
	selector: 'app-secure',
	templateUrl: './secure.component.html',
	styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {

	sideBar: any[] = [
		{name: 'Company', url: '/company', icon: 'fa-building-o'},
		{name: 'User', url: '/user', icon: 'fa-user'},
		{name: 'Role', url: '/role', icon: 'fa-files-o'},
		{name: 'Scope', url: '/scope', icon: 'fa-th'},
		{name: 'Activity', url: '/activity', icon: 'fa-bus'},
	];

	constructor(router: Router) {
	}

	ngOnInit() {
	}

}
