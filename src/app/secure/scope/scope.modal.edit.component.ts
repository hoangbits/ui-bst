import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';

import {Scope} from './index';
import {ScopeService} from './scope.service';

import * as _ from 'lodash';

@Component({
	selector: 'modal-content',
	templateUrl: './scope.modal.edit.html',
	providers: [ScopeService]
})
export class ScopeModalEditComponent implements OnInit {
	title: string;
	isEditName: boolean;
	scope: Scope;

	dropdownList = [];
	selectedItems = [];
	dropdownSettings = {};

	constructor(public bsModalRef: BsModalRef, private scopeService: ScopeService) {
	}

	ngOnInit() {
		this.loadActivities();

		this.dropdownSettings = {
			singleSelection: false,
			text: 'Select Activities',
			selectAllText: 'Select All',
			unSelectAllText: 'UnSelect All',
			enableSearchFilter: true,
			classes: 'myclass custom-class'
		};
	}

	loadActivities() {
		this.scopeService.getActivities().subscribe(
			activities => {
				let selectedIds = [];

				// create list data
				_.each(activities, (activity) => {
					this.dropdownList.push({id: activity.id, itemName: activity.method + ' - ' + activity.url});
				});

				// get selected id list
				_.each(this.scope.activities, act => {
					selectedIds.push(act.id);
				});

				// set selected items.
				this.selectedItems = _.filter(this.dropdownList, function (p) {
					return _.includes(selectedIds, p.id);
				});
			},
			err => {
				console.log(err);
			});
	}

	saveConfig() {
		let selectedIds = [];
		_.each(this.selectedItems, item => {
			selectedIds.push(item.id);
		});

		this.scope.activities = selectedIds;
		// show config
		this.isEditName = false;
		// save
		if (!this.scope.id) {
			this.addScope(this.scope, false);
		}
		else {
			this.saveScope(this.scope, false);
		}
	}

	saveClose() {
		let selectedIds = [];
		_.each(this.selectedItems, item => {
			selectedIds.push(item.id);
		});

		this.scope.activities = selectedIds;

		if (!this.scope.id) {
			this.addScope(this.scope, true);
		}
		else {
			this.saveScope(this.scope, true);
		}
	}

	private saveScope(scope, isClose) {
		this.scopeService.updateScope(this.scope).subscribe(data => {
			if (data) {
				if (isClose) {
					this.bsModalRef.hide();
				}
			}
			else {
				console.log('update failed');
			}
		});
	}

	private addScope(scope, isClose) {
		this.scopeService.addScope(this.scope).subscribe(data => {
			if (data) {
				this.scope = data;
				if (isClose) {
					this.bsModalRef.hide();
				}
			}
			else {
				console.log('create failed');
			}
		});
	}

}
