import {Component, OnInit, ViewContainerRef } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService } from 'ngx-bootstrap/modal';
import {RoleService} from '../role.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {
  Scope, Role
} from '../index';

import * as _ from 'lodash';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css'],
  providers: [RoleService]
})
export class EditRoleComponent implements OnInit {

  title: string;
  isEdit: boolean;
  isSaveConfig: boolean;
  checkEmptyRoleName: boolean;
  scope: Scope;
  role: Role;
  roles: Role[];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  errorMsg: string;

  constructor(
    public bsModalRef: BsModalRef,
    public  modalService: BsModalService,
    private roleService: RoleService,
    private toastr: ToastsManager,
    private _vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(_vcr);
  }

  ngOnInit() {
    this.checkEmptyRoleName = true;
    this.dropdownSettings = {
      singleSelection: false,
      text: 'Select Scope',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };

  }

  showSuccess() {
    this.toastr.success('You are awesome!', 'Success!');
  }

  saveConfig() {
    if (!this.role.roleName) {
      this.checkEmptyRoleName = false;
    } else {
      this.roleService.createRoles(this.role).subscribe((data) => {
        this.role = data;
        this.isEdit = !this.isEdit;
        this.isSaveConfig = !this.isSaveConfig;

      }, err => {
        this.errorMsg = err.message;
      });
    }
  }

  saveScope() {
    const scopes = [];
    _.each(this.selectedItems, item => {
      scopes.push({id: item.id});
    });
    this.role.scopes = scopes;
    this.roleService.updateRole(this.role).subscribe((data) => {
        // this.showSuccess();
        // this.modalService.setDismissReason('Yes');
        this.bsModalRef.hide();
      },
      err => {
        this.errorMsg = err.message;
      });
  }

  saveClose() {
    if (!this.role.roleName) {
      this.checkEmptyRoleName = false;
    }
    if (this.role.id) {
      this.roleService.updateRole(new Role(this.role.roleName, this.role.description, this.role.id, [])).subscribe((data) => {
       // this.showSuccess();
      //  this.modalService.setDismissReason('Yes');
        this.bsModalRef.hide();
      }, err => {
        this.errorMsg = err.message;
      });
    } else {
      this.roleService.createRoles(this.role).subscribe((data) => {
        this.role = data;
        //this.showSuccess();
      //  this.modalService.setDismissReason('Yes');
        this.bsModalRef.hide();
      }, err => {
        this.errorMsg = err.message;
      });
    }
  }
}
