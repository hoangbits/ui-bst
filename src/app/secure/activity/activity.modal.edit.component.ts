import {Component, OnInit,ViewContainerRef} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

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
	errorMsg: string;

	activityForm: FormGroup;
	submitted: boolean;

	constructor(public bsModalRef: BsModalRef,
							private activityService: ActivityService,
							private fb: FormBuilder,
							public toastr: ToastsManager,
							vcr: ViewContainerRef) {
		this.activity = this.activity || new Activity();
		this.toastr.setRootViewContainerRef(vcr);
	}

	ngOnInit() {
		this.createForm();
	}

	createForm() {
		this.activityForm = this.fb.group({
			'url': ['', Validators.required],
			'method': ['', Validators.required],
			'urlRegex': ['', Validators.required]
		});
	}

	saveClose() {
		this.submitted = true;

		// Validate input
		if (!this.activityForm.valid) {
			return false;
		}

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
					this.toastr.warning('Save Permission failed!', 'Alert!');
				}
			},
			err => {
				this.toastr.warning('Save Permission failed!', 'Alert!');
			});
	}

	private add() {
		this.activityService.addActivity(this.activity).subscribe(data => {
				if (data) {
					this.bsModalRef.hide();
				}
				else {
					this.toastr.warning('Save Permission failed!', 'Alert!');
				}
			},
			err => {
				this.toastr.warning('Save Permission failed!', 'Alert!');
			});
	}

}
