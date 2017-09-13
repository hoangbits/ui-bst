import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {UserService} from '../../user/user.service';
import {BsModalService} from 'ngx-bootstrap/modal';

import {
  User, Role, Location, CreateUserCompanyComponent, EditViewAdminCompanyComponent
} from '../index';


import {MdDialog} from '@angular/material';
import {AlertDialog} from '../../dialog/alert.dialog.component';
import {SYSTEM_CONFIG} from '../../../config/system/systemConfig';
import {MESSAGE_CONFIG} from '../../../config/system/messageConfig';
import * as _ from 'lodash';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-list-user-company',
  templateUrl: './list-user-company.component.html',
  styleUrls: ['./list-user-company.component.css'],
  providers: [UserService]
})
export class ListUserCompanyComponent implements OnInit {

  listUsers: string[];
  user: User;
  bsModalRef: BsModalRef;
  listRole: string[];
  role: Role;
  title: string;
  currentPage = 0;
  itemsPerPage = 10;
  totalItems = 0;
  indexPage = 0;
  userType = [];
  locationData = [];
  ortherUserFlag: boolean;
  company: {
    'companyId': '';
  };

  criteria: any;
  public currentUserData: any;
  public currentUserType: any;
  public currentUserCompanyId: any;

  constructor(private userService: UserService,
              private modalService: BsModalService,
              private dialog: MdDialog, private toastr: ToastrService) {

    // this.currentUserType = '1';
    // this.currentUserCompanyId = '5996a809734d98493461e848'

    this.currentUserData = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUserType = this.currentUserData.user.userType;
    this.currentUserCompanyId = this.currentUserData.user.company.companyId;
    this.getAllUser();
    this.getListRole();
    this.userType = SYSTEM_CONFIG.USER_TYPE;
    this.user = this.user || new User();
  }

  ngOnInit() {
  }

  getAllUser(criteria?: any) {
    this.criteria = criteria ? criteria : {companyId: this.currentUserCompanyId};
    this.userService.getUsers(this.currentPage, this.itemsPerPage, JSON.stringify(this.criteria)).subscribe(
      response => {
        this.listUsers = response.data;
        this.totalItems = response.total;
      },
      error => {
        alert('Server error');
      }
    );
    return event;
  }

  getListRole() {
    this.userService.getRoles().subscribe(
      data => this.listRole = data,
      err => {
        alert('Server error');
      });
  }


  addNew() {
    this.ortherUserFlag = this.currentUserType === '1' ? true : false;
    this.userService.findOneCompany(this.currentUserCompanyId).subscribe(
      data => {
        this.locationData = data.locations;
        this.openCreateModal(this.listRole, this.ortherUserFlag, this.locationData);
      },
      err => {
        console.log(err);
      });

  }

  openCreateModal(roles: string[], ortherUserFlag: boolean, locationData: any) {
    this.bsModalRef = this.modalService.show(CreateUserCompanyComponent);
    this.bsModalRef.content.roleData = roles;
    this.bsModalRef.content.title = 'New User';
    this.bsModalRef.content.locationData = locationData;
    this.bsModalRef.content.ortherUserFlag = ortherUserFlag;
    this.modalService.onHide.observers = [];
    this.modalService.onHide.subscribe((result) => {
      if (result) {
        this.getAllUser();
        this.toastr.success(MESSAGE_CONFIG.USER.CREATE_SUCCESS, 'Success!');
      }
    });
  }

  editViewUser(userId: string, editView: number) {

    let disableInput: boolean;
    let title: string;

    title = editView === 0 ? 'Update User' : 'View User Info';
    disableInput = editView === 0;

    this.userService.findOneCompany(this.currentUserCompanyId).subscribe(
      data => {
        this.locationData = data.locations;
        this.findUserById(userId, disableInput, title, data.locations);
      },
      err => {
        console.log(err);
      });
  }


  findUserById(userId: string, disableInput: boolean, title: string, locationData: any): void {
    this.userService.findOne(userId).subscribe(
      data => {
        this.user = data;
        this.role = data.roles[0];
        this.openEditModal(this.listRole, this.user, this.role, disableInput, title, locationData);
      }
    );
  }

  openEditModal(roles: string[], user: User, role: Role, disableInput: boolean, title: string, locationData: any) {
    this.bsModalRef = this.modalService.show(EditViewAdminCompanyComponent);
    this.bsModalRef.content.roleData = roles;
    this.bsModalRef.content.user = user;
    this.bsModalRef.content.role = role;
    this.bsModalRef.content.title = title;
    this.bsModalRef.content.disableInput = disableInput;
    this.bsModalRef.content.locationData = locationData;
    this.modalService.onHide.observers = [];
    this.modalService.onHide.subscribe((result) => {
      if (result) {
        this.getAllUser();
        this.toastr.success(MESSAGE_CONFIG.USER.UPDATE_SUCCESS, 'Success!');
      }
    });
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.indexPage = this.currentPage > 1 ? (this.currentPage - 1) * this.itemsPerPage : 0;
    this.getAllUser(this.criteria);
  }

  public showModal(userId: string) {
    this.dialog.open(AlertDialog, {
      width: '400px', height: '170px', data: {
        title: 'Confirm dialog', message: 'Are you sure you want to delete this item?'
      }
    }).afterClosed().subscribe(result => {
      if (result === 'OK') {
        this.userService.deleteUser(userId).subscribe(
          data => {
            this.toastr.success(MESSAGE_CONFIG.USER.DELETE_SUCCESS, 'Success!');
            this.getAllUser();
          }
        );
      }
    });
  }


}
