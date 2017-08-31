import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {User} from '../user.model';
import {Role} from '../role.model';
import {UserService} from '../user.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  providers: [UserService]
})
export class EditUserComponent implements OnInit {
  roleData = [];
  user: User;
  role: Role;
  disableInput: boolean;
  title: string;
  errorMsg: string;
  selectedItems = [];
  dropdownSettings = {};
  roles = {
    'roleId': '',
    'roleName': '',
  };

  constructor(public bsModalRef: BsModalRef, private userService: UserService) {
    this.user = this.user || new User();
    this.role = this.role || new Role();
    this.dropdownSettings = {
      singleSelection: true,
      text: 'Select Company',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };

  }

  ngOnInit() {
  }

  updateUser(isValid: boolean, user: User, roleId: string) {
    this.user.roles = [];
    if (isValid) {

      if (roleId) {
        this.getRoleData(roleId, this.roleData);
        this.user.roles = this.roles;
      }

      const company = {
        'companyId': '',
        'companyName': ''
      };
      _.each(this.selectedItems, item => {
        company.companyId = item.id;
        company.companyName = item.itemName;
      });
      this.user.company = company;

      this.userService.updateUsers(this.user).subscribe(
        data => this.bsModalRef.hide(),
        err => {
          this.errorMsg = err.message;
        });
    } else {
      return;
    }
  }

  getRoleData(id: string, listRole: Role[]): void {
    _.each(listRole, role => {
      if (id === role.id) {
        this.roles.roleId = role.id;
        this.roles.roleName = role.roleName;
      }
    });
  }


}
