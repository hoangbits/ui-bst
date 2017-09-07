import {Component, OnInit} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {UserService} from '../user.service';
import {
  EditUserComponent, CreateUserComponent,
  User, Role
} from '../index';
import {Company} from '../company.model';
import {Companies} from '../companies.model';
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
  company: Company;
  title: string;
  currentPage = 0;
  itemsPerPage = 10;
  totalItems = 0;
  indexPage = 0;
  criteria: any;
  userType = [];
  companies: Companies;


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
        this.company = data;
        _.each(this.company, (data) => {
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
    this.modalService.onHide.subscribe(() => this.getAllUser(),
      err => {
        console.log(err);
      });
  }

  editUser(userId: string) {
    this.title = 'Edit an User';
    const dropdownList = [];
    this.userService.getAllCompany().subscribe(
      data => {
        this.companies = data;
        _.each(this.companies, (data) => {
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
        this.company = data;
        _.each(this.company, (data) => {
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
        this.user = data;
        if (this.user.company) {
          this.companies = this.user.company;
          selectedItems.push({id: this.companies.companyId, itemName: this.companies.companyName});
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
    this.modalService.onHide.subscribe(() => this.getAllUser(),
      err => {
        console.log(err);
      });
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.indexPage = this.currentPage > 1 ? (this.currentPage - 1) * this.itemsPerPage : 0;
    this.getAllUser(this.criteria);
  }
}

