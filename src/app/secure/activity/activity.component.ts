import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {ToastrService} from 'ngx-toastr';

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
  indexPage: number = 0;

  constructor(private activityService: ActivityService,
              private modalService: BsModalService,
              private dialog: MdDialog,
              private toastr: ToastrService) {
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
        //TODO handler message error
        console.log(err);
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
          this.toastr.success('Delete Permission successfully!', 'Success!');
          this.loadActivities();
        });
      }
    });
  }

  addNew() {
    this.openEditModal('New Permission', new Activity());
  }

  edit(activity) {
    this.openEditModal('Edit Permission', activity);
  }

  openEditModal(title, data?: Activity) {

    this.bsModalRef = this.modalService.show(ActivityModalEditComponent);
    this.bsModalRef.content.title = title;
    this.bsModalRef.content.activity = data;
    this.modalService.onHide.observers = [];
    this.modalService.onHide.subscribe((result) => {
      if (result) {
        this.loadActivities();
        let update = title === 'New Permission' ? 'created' : 'updated';
        this.toastr.success('Permission is ' + update + ' successfully!', 'Success!');
      }
    });
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.indexPage = this.currentPage > 1 ? (this.currentPage - 1) * this.itemsPerPage : 0;
    this.loadActivities();
  }
}