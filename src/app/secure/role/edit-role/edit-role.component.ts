import {Component, OnInit, Input, Output,} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {RoleService} from '../role.service';
import {Scope} from '../scope.model';
import {Role} from '../role.model';

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
  roleId: string;


  myForm: FormGroup;
  submitted: boolean;

  constructor(public bsModalRef: BsModalRef, private roleService: RoleService, private _fb: FormBuilder) {
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

  saveConfig() {
    if (!this.role.roleName) {
      this.checkEmptyRoleName = false;
    } else {
      this.roleService.createRoles(this.role).subscribe((data) => {
        this.role = data;
        this.isEdit = !this.isEdit;
        this.isSaveConfig = !this.isSaveConfig;
      });
    }
  }

  saveScope() {
    let scopesArr = []
    _.each(this.selectedItems, item => {
      scopesArr.push({id: item.id});
    });
    this.role.scopes = scopesArr;
    this.roleService.updateRole(this.role).subscribe((data) => {
      this.bsModalRef.hide();
    }),
      err => {
        console.log(err);
      };
  }

  saveClose() {
    if (!this.role.roleName) {
      this.checkEmptyRoleName = false;
    }
    if (this.role.id) {
      this.roleService.updateRole(new Role(this.role.roleName, this.role.description, '', this.role.id, [])).subscribe((data) => {
        this.bsModalRef.hide();
      }),
        err => {
          console.log(err);
        };
    } else {
      this.roleService.createRoles(this.role).subscribe((data) => {
        this.role = data;
        this.bsModalRef.hide();

    });


    }
  }


}
