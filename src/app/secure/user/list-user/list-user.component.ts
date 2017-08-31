import {Component, OnInit} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {UserService} from '../user.service';
import {User} from '../user.model';
import {Role} from '../role.model';
import {Company} from '../company.model';
import {Companies} from '../companies.model';
import {EditUserComponent} from '../edit-user/edit-user.component';
import {CreateUserComponent} from '../create-user/create-user.component';

import {MdDialog} from '@angular/material';
import {AlertDialog} from '../../dialog/alert.dialog.component';
import {SYSTEM_CONFIG} from '../../../config/system/systemConfig';
import * as _ from 'lodash';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
  providers: [UserService]
})
export class ListUserComponent implements OnInit {

  listUsers: string[];
  user: User;
  bsModalRef: BsModalRef;
  listRole: string[];
  role: Role;
  companys: Company;
  title: string;
  currentPage = 0;
  itemsPerPage = 10;
  totalItems = 0;
  criteria: any;
  userType = [];
  companie: Companies;


  dropdownList = [];
  dropdownSettings = {
    disabled: false
  };

  constructor(private userService: UserService,
              private modalService: BsModalService,
              private dialog: MdDialog) {
    this.getAllUser();
    this.getListRole();
    this.user = this.user || new User();
    this.userType = SYSTEM_CONFIG.USER_TYPE;
  }

  ngOnInit() {

  }


  getAllUser(criteria?: any) {
    this.criteria = criteria;
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
        console.log(err);
      });
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
            this.getAllUser();
          }
        );
      }
    });
  }


  addNew() {
    const dropdownList = [];
    this.userService.getAllCompany().subscribe(
      data => {
        this.companys = data;
        _.each(this.companys, (data) => {
          dropdownList.push({id: data.id, itemName: data.companyName});
        });
      },
      err => {
        console.log(err);
      });
    this.openCreateModal(this.listRole, dropdownList);
  }

  openCreateModal(roles: string[], dropdownList?: any) {
    this.bsModalRef = this.modalService.show(CreateUserComponent);
    this.bsModalRef.content.roleData = roles;
    this.bsModalRef.content.dropdownList = dropdownList;
    this.bsModalRef.content.title = 'Add new User';
    this.modalService.onHide.subscribe(data => this.getAllUser(),
      err => {
        console.log(err);
      });
  }

  editUser(userId: string) {
    this.title = 'Edit an User';
    const dropdownList = [];
    this.userService.getAllCompany().subscribe(
      data => {
        this.companie = data;
        _.each(this.companie, (data) => {
          dropdownList.push({id: data.id, itemName: data.companyName});
        });
        this.findUserById(userId, true, this.title, dropdownList);
      },
      err => {
        console.log(err);
      });

  }

  viewUser(userId: string) {
    this.title = 'View User Info';
    const dropdownList = [];
    this.userService.getAllCompany().subscribe(
      data => {
        this.companys = data;
        _.each(this.companys, (data) => {
          dropdownList.push({id: data.id, itemName: data.companyName});
        });

        this.findUserById(userId, false, this.title, dropdownList);
      },
      err => {
        console.log(err);
      });

  }

  findUserById(userId: string, disableInput: boolean, title: string, dropdownList: string[]): void {
    const selectedItems = [];
    this.userService.findOne(userId).subscribe(
      data => {
        console.log('user data', JSON.stringify(data));
        this.user = data;
        if (this.user.company) {
          this.companie = this.user.company;
          selectedItems.push({id: this.companie.companyId, itemName: this.companie.companyName});
        }
        this.role = data.roles[0];
        this.openEditModal(this.listRole, this.user, this.role, disableInput, title, dropdownList, selectedItems);
      }
    );
  }

  openEditModal(roles: string[], user: User, role: Role, disableInput: boolean, title: string, dropdownList: string[], selectedItems: string[]) {
    this.bsModalRef = this.modalService.show(EditUserComponent);
    this.bsModalRef.content.roleData = roles;
    this.bsModalRef.content.user = user;
    this.bsModalRef.content.role = role;
    this.bsModalRef.content.title = title;
    this.bsModalRef.content.disableInput = disableInput;
    this.bsModalRef.content.dropdownList = dropdownList;
    this.bsModalRef.content.selectedItems = selectedItems;
    this.modalService.onHide.subscribe(data => this.getAllUser(),
      err => {
        console.log(err);
      });
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.getAllUser(this.criteria);
  }
}

