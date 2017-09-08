import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';

import {Scope} from './index';
import {ScopeService} from './scope.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

import * as _ from 'lodash';

@Component({
  selector: 'modal-content',
  templateUrl: './scope.modal.edit.html',
  providers: [ScopeService]
})
export class ScopeModalEditComponent implements OnInit {
  scopeForm: FormGroup;
  submitted: boolean;

  errorMsg: string;

  title: string;
  isEditName: boolean;
  isAddNew: boolean;
  scope: Scope;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  constructor(public bsModalRef: BsModalRef,
              private scopeService: ScopeService,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private modalService: BsModalService) {
  }

  ngOnInit() {
    this.loadActivities();

    this.dropdownSettings = {
      singleSelection: false,
      text: 'Select Permissions',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };

    this.createForm();
  }

  createForm() {
    this.scopeForm = this.fb.group({
      'scopeName': ['', Validators.required],
      'description': '',
      'activities': ''
    });
  }

  loadActivities() {
    this.scopeService.getActivities().subscribe(
      activities => {
        if (!activities) {
          return;
        }
        let selectedIds = [];

        // create list data
        _.each(activities, (activity) => {
          this.dropdownList.push({id: activity.id, itemName: activity.method + ' - ' + activity.url});
        });

        // get selected id list
        if (this.scope) {
          _.each(this.scope.activities, act => {
            selectedIds.push(act.id);
          });
        }

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

    // save
    if (!this.scope.id) {
      this.addScope(false);
    }
    else {
      this.saveScope(false);
    }
  }

  saveClose() {
    this.submitted = true;
    // Validate input
    if (!this.scopeForm.valid && !(!this.isEditName && this.scope.id)) {
      return false;
    }

    // prepare activities id for save
    let selectedIds = [];
    _.each(this.selectedItems, item => {
      selectedIds.push(item.id);
    });

    this.scope.activities = selectedIds;

    if (!this.scope.id) {
      this.addScope(true);
    }
    else {
      this.saveScope(true);
    }
  }

  private saveScope(isClose) {
    this.scopeService.updateScope(this.scope).subscribe(data => {
        if (data) {
          if (isClose) {
            this.modalService.setDismissReason('Yes');
            this.bsModalRef.hide();
          }
          // show config
          this.isEditName = false;
          this.errorMsg = '';
        }
        else {
          this.toastr.warning('Update failed', 'Alert!');
        }
      },
      err => {
        this.toastr.warning(err, 'Alert!');
      });
  }

  private addScope(isClose) {
    this.scopeService.addScope(this.scope).subscribe(data => {
        if (data) {
          this.scope = data;
          if (isClose) {
            this.modalService.setDismissReason('Yes');
            this.bsModalRef.hide();
          }
          // show config
          this.isEditName = false;
          this.isAddNew = false;
          this.errorMsg = '';
        }
        else {
          this.toastr.warning('Insert failed', 'Alert!');
        }
      },
      err => {
        this.toastr.warning(err, 'Alert!');
      });
  }

}


