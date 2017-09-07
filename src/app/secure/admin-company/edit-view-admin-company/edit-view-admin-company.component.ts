import {Component, OnInit} from '@angular/core';
import {
  User, Role, Location
} from '../index';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {UserService} from '../../user/user.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-edit-view-admin-company',
  templateUrl: './edit-view-admin-company.component.html',
  styleUrls: ['./edit-view-admin-company.component.css'],
  providers: [UserService]
})
export class EditViewAdminCompanyComponent implements OnInit {

  roleData = [];
  locationData = [];
  user: User;
  role: Role;
  disableInput: boolean;
  title: string;
  errorMsg: string;
  selectedItems = [];
  roles = {
    'roleId': '',
    'roleName': '',
  };

  public currentUserData: any;
  public currentUserCompany: any;
  public currentUserType: any;

  constructor(public bsModalRef: BsModalRef, private  userService: UserService) {

    this.user = this.user || new User();
    this.role = this.role || new Role();

    this.currentUserData = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUserCompany = this.currentUserData.user.company;
    this.currentUserType = this.currentUserData.user.userType;
  }

  ngOnInit() {
  }

  updateUser(isValid: boolean, user: User, roleId: string, locationId: string) {
    this.user.roles = [];
    if (isValid) {

      if (roleId) {
        this.getRoleData(roleId, this.roleData);
        this.user.roles = this.roles;
      }
      this.user.company = this.currentUserCompany;
      this.user.userType = this.currentUserType;
      this.getLocationData(locationId, this.locationData);
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

  getLocationData(id: string, listLocation: Location[]): void {
    _.each(listLocation, item => {
      if (id === item.id) {
        this.user.location = item;
      }
    });
  }

}
