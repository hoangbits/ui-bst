import {Component, OnInit} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';

import {MdDialog} from '@angular/material';
import {AlertDialog} from '../dialog/alert.dialog.component';

import {ActivityService} from './activity.service';
import {Activity} from './activity.model';
import {ActivityModalEditComponent} from './activity.modal.edit.component';

@Component({
	selector: 'app-activity',
	templateUrl: './activity.component.html',
	styleUrls: ['./activity.component.css'],
})
export class ActivityComponent implements OnInit {
	bsModalRef: BsModalRef;
	activities: any[];

	// Pagination setting
	currentPage: number = 0;
	itemsPerPage: number = 10;
	totalItems: number = 0;

	constructor(private activityService: ActivityService,
							private modalService: BsModalService,
							private dialog: MdDialog) {
		this.loadActivities();
	}

	ngOnInit() {
	}

	loadActivities() {
		this.activityService.getActivities(this.itemsPerPage, this.currentPage).subscribe(
			result => {
				this.activities = result.activities;
				this.totalItems = result.meta.paginate.totalCount;
			},
			err => {
				this.dialog.open(AlertDialog, {
					width: '500px', height: '170px', data: {
						title: 'Information dialog', message: 'Load Activity list has error, contact administrator to help'
					}
				});
			});
	}

	/* Show confirm delete */
	public showModal(id) {
		this.dialog.open(AlertDialog, {
			width: '400px', height: '170px', data: {
				title: 'Confirm dialog', message: 'Are you sure you want to delete this item?'
			}
		}).afterClosed().subscribe(result => {

			if (result === 'OK') {
				this.activityService.removeActivity(id).subscribe(() => {

					// Reload Activity table
					this.loadActivities();
				});
			}
		});
	}

	addNew() {
		this.openEditModal('Add new Activity', new Activity());
	}

	edit(activity) {
		this.openEditModal('Edit Activity', activity);
	}

	openEditModal(title, data?: Activity) {

		this.bsModalRef = this.modalService.show(ActivityModalEditComponent);
		this.bsModalRef.content.title = title;
		this.bsModalRef.content.activity = data;

		this.modalService.onHide.subscribe(() => {
			this.loadActivities();
		});
	}

	pageChanged(event: any): void {
		this.currentPage = event.page;
		this.loadActivities();
	}
}