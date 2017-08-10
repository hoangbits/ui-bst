import {Component, OnInit, ViewChild} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {ModalDirective} from 'ngx-bootstrap/modal/modal.component';
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
	activities: Activity[];

	deleteId: string;

	@ViewChild(ModalDirective) public modal: ModalDirective;

	public rowsOnPage = 5;

  constructor(private activityService: ActivityService, private modalService: BsModalService) {
		this.loadActivites();
  }

  ngOnInit() {
  }

	loadActivites() {
		this.activityService.getActivities().subscribe(
			activities => {
				this.activities = activities;
			},
			err => {
				console.log(err);
			});
	}

	public showModal(id) {
		this.deleteId = id;
		this.modal.show();
	}

	ok() {
		this.activityService.removeActivity(this.deleteId).subscribe(()=>{
			this.modal.hide();
			this.loadActivites();
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

		this.modalService.onHide.subscribe(()=>{
			this.loadActivites();
		});
	}

}
