import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';

import {Activity} from './activity.model';
import {ActivityService} from './activity.service';

@Component({
	selector: 'activity-modal-content',
	templateUrl: './activity.modal.edit.html',
	providers: [ActivityService]
})
export class ActivityModalEditComponent implements OnInit {
	title: string;
	activity: Activity;

	constructor(public bsModalRef: BsModalRef, private activityService: ActivityService) {
			this.activity = this.activity|| new Activity();
	}

	ngOnInit() {
	}

	saveClose() {
		console.log(this.activity);
		if (!this.activity.id) {
			this.add();
		}
		else {
			this.save();
		}
	}

	private save() {
		this.activityService.updateActivity(this.activity).subscribe(data => {
			if (data) {
				this.bsModalRef.hide();
			}
			else {
				console.log('update failed');
			}
		});
	}

	private add() {
		this.activityService.addActivity(this.activity).subscribe(data => {
			if (data) {
					this.bsModalRef.hide();
			}
			else {
				console.log('create failed');
			}
		});
	}

}
