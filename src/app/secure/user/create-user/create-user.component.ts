import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {
  User, Role
} from '../index';
import {UserService} from '../user.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  providers: [UserService]

})
export class CreateUserComponent implements OnInit {
  user: User;
  userOther: User;
  roleData = [];
  title: string;
  passDefault = '123456';
  errorMsg: string;
  selectedItems = [];
  selectedItemsOtherUser = [];
  dropdownList = [];
  dropdownSettings = {};
  company = {
    'companyId': '',
    'companyName': ''
  };

  role = {
    'roleId': '',
    'roleName': '',
  }


  constructor(public bsModalRef: BsModalRef, private userService: UserService) {

    this.dropdownSettings = {
      singleSelection: true,
      text: 'Select Company',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
  }


  ngOnInit() {
    this.user = this.user || new User();
    this.userOther = this.userOther || new User();
  }


  saveOtherUser(formValue: any, idRole: string, isValid: boolean) {

    if (isValid) {
      if (idRole) {
        this.getRoleData(idRole, this.roleData);
        this.userOther.roles = this.role;
      }
      if (this.selectedItemsOtherUser.length > 0) {
        _.each(this.selectedItemsOtherUser, item => {
          this.company.companyId = item.id;
          this.company.companyName = item.itemName;
        });
        this.userOther.company = this.company;
      }
      this.userOther.email = formValue.emailOrther;
      this.userOther.fullName = formValue.fullNameOrther;
      this.userOther.password = formValue.password;
      this.userOther.userType = '1';
      this.saveUserFunction(this.userOther);
    } else {
      return;
    }
  }

  saveAdUser(model: User, idRole: string, isValid: boolean) {

    if (isValid) {
      if (idRole) {
        this.getRoleData(idRole, this.roleData);
        this.user.roles = this.role;
      }
      if (this.selectedItems.length > 0) {
        _.each(this.selectedItems, item => {
          this.company.companyId = item.id;
          this.company.companyName = item.itemName;
        });
        this.user.company = this.company;
      }
      this.user.userType = '0';
      this.user.password = this.passDefault;
      this.saveUserFunction(this.user);
    } else {
      return;
    }
  }

  getRoleData(id: string, listRole: Role[]): void {
    _.each(listRole, item => {
      if (id === item.id) {
        this.role.roleId = item.id;
        this.role.roleName = item.roleName;
      }
    });
  }

  saveUserFunction(user: User): void {
    this.userService.createUsers(user).subscribe(
      data => this.bsModalRef.hide(),
      err => {
        this.errorMsg = err.message;
      });
  }

}
