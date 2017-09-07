import {Component, OnInit} from '@angular/core';
import {
  User, Role, Location
} from '../index';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {UserService} from '../../user/user.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-create-user-company',
  templateUrl: './create-user-company.component.html',
  styleUrls: ['./create-user-company.component.css'],
  providers: [UserService]
})
export class CreateUserCompanyComponent implements OnInit {

  user: User;
  roleData = [];
  locationData = [];
  title: string;
  passDefault = '123456';
  errorMsg: string;
  ortherUserFlag: boolean;
  public currentUserData: any;
  public currentUserCompany: any;
  public currentUserType: any;
  role = {
    'roleId': '',
    'roleName': '',
  };

  company = {
    'companyId' : '5996a7ee734d98493461e83a',
    'companyName' : 'company 1'
  };

  constructor(public bsModalRef: BsModalRef, private userService: UserService) {
    // this.currentUserData = JSON.parse(localStorage.getItem('currentUser'));
    // this.currentUserCompany = this.currentUserData.user.company;
    // this.currentUserType = this.currentUserData.user.userType;

    this.currentUserData = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUserCompany = this.currentUserData.user.company;
    this.currentUserType = '1';
  }

  ngOnInit() {
    this.user = this.user || new User();
  }

  saveAdUser(formValue: any, idRole: string, idLocation: string, isValid: boolean) {

    if (isValid) {
      if (idRole) {
        this.getRoleData(idRole, this.roleData);
        this.user.roles = this.role;
      }
      this.getLocationData(idLocation, this.locationData);
      this.user.password = formValue.password ? formValue.password : '123456';
      this.user.email = formValue.txtEmail;
      this.user.fullName = formValue.fullName;
      this.user.userType = this.currentUserType;
      this.user.company = this.company;
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

  getLocationData(id: string, listLocation: Location[]): void {
    _.each(listLocation, item => {
      if (id === item.id) {
        this.user.location = item;
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
