import {Component, OnInit} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {RoleService} from '../role.service';
import {
  Scope, Role, EditRoleComponent
} from '../index';
import {SYSTEM_CONFIG} from '../../../config/system/systemConfig';
import {MESSAGE_CONFIG} from '../../../config/system/messageConfig';
import {MdDialog} from '@angular/material';
import {AlertDialog} from '../../dialog/alert.dialog.component';
import {ToastrService} from 'ngx-toastr';

import * as _ from 'lodash';

@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.css'],
  providers: [RoleService]
})
export class ListRoleComponent implements OnInit {

  roles: Role[];
  scopes: Scope[];
  role: Role;
  bsModalRef: BsModalRef;
  selectedItems = [];
  dropdownList = [];
  roleType = [];

  constructor(private roleService: RoleService, private modalService: BsModalService, private dialog: MdDialog,
              private toastr: ToastrService) {
    this.getAllRoles();
    this.roleType = SYSTEM_CONFIG.ROLE_TYPE;
  }

  ngOnInit() {
  }



  getAllRoles() {
    this.roleService.getRoles()
      .subscribe(
        data => this.roles = data,
        err => {
          console.log(err);
        });
  }

  public showModal(roleId: string) {
    this.dialog.open(AlertDialog, {
      width: '400px', height: '170px', data: {
        title: 'Confirm dialog', message: 'Are you sure you want to delete this item?'
      }
    }).afterClosed().subscribe(result => {
      if (result === 'OK') {
        this.roleService.deleteRole(roleId).subscribe(
          data => {
            this.toastr.success(MESSAGE_CONFIG.ROLE.DELETE_SUCCESS, 'Success!');
            this.getAllRoles();
          }
        );
      }
    });
  }

  editName(roleId: string) {

    this.roleService.findOne(roleId).subscribe(
      data => {
        this.role = data;
        this.openEditModal('Update Role', true, data.roles, '', '', true, this.roleType);
      }
    );
  }

  editConfig(roleId: string) {
    this.dropdownList = [];
    this.selectedItems = [];

    this.roleService.findOne(roleId).subscribe(
      data => {
        this.role = data;
        if (data.roles.scopes.length > 0) {
          data.roles.scopes.forEach((scope) => {
            this.selectedItems.push({id: scope.id, itemName: scope.scopeName});
          });
        }

        if (data.scopes.length > 0) {
          data.scopes.forEach((scope) => {
            this.dropdownList.push({id: scope.id, itemName: scope.scopeName});
          });
        }
        this.openEditModal('Config Role', false, data.roles, this.selectedItems, this.dropdownList, true, this.roleType);
      }
    );
  }

  addNew() {
    const dropdownList = [];
    this.roleService.getScopes().subscribe(
      scopes => {
        this.scopes = scopes;
        _.each(this.scopes, (scope) => {
          dropdownList.push({id: scope.id, itemName: scope.scopeName});
        });
        this.openEditModal('New Role', true, new Role(), [], dropdownList, false, this.roleType);
      },
      err => {
        console.log(err);
      });

  }

  openEditModal(title, isEdit, data?: Role, selectedItems?: any, dropdownList?: any, isSaveConfig?: boolean, roleType?: any) {
    this.bsModalRef = this.modalService.show(EditRoleComponent);
    this.bsModalRef.content.title = title;
    this.bsModalRef.content.isEdit = isEdit;
    this.bsModalRef.content.role = data;
    this.bsModalRef.content.roleType = roleType;
    this.bsModalRef.content.isSaveConfig = isSaveConfig;
    this.bsModalRef.content.selectedItems = selectedItems;
    this.bsModalRef.content.dropdownList = dropdownList;
    this.modalService.onHide.observers = [];
    this.modalService.onHide.subscribe((result) => {
      if (result) {
        this.getAllRoles();
        this.toastr.success(MESSAGE_CONFIG.ROLE.CREATE_SUCCESS, 'Success!');
      }
    });

  }

}
