import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';
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
              private modalService: BsModalService,
              private toastr: ToastrService) {
		this.activity = this.activity || new Activity();
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
          this.modalService.setDismissReason('Yes');
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
          this.modalService.setDismissReason('Yes');
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
