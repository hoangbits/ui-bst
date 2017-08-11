import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { Role } from '../role.model';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { CreateUserComponent } from '../create-user/create-user.component';
import { Http } from '@angular/http';
import * as _ from 'lodash';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
  providers: [UserService]
})
export class ListUserComponent implements OnInit {

  listUsers: string[];
  userId: string;
  user: User;
  bsModalRef: BsModalRef;
  isEdit: boolean;
  listRole: string[];
  role: Role;
  pageCurrent: number;
  disableInput: boolean;

  currentPage: number = 0;
	itemsPerPage: number = 3;
	totalItems: number = 0;
 

  @ViewChild(ModalDirective) public modal: ModalDirective;

  constructor(private userService: UserService, private modalService: BsModalService,private http: Http) {
    this.getAllUser();
    this.getListRole();
     this.user = this.user || new User();
  }

  ngOnInit() {

  }

	public getAllUser(){
		this.userService.getUsers(this.currentPage,this.itemsPerPage).subscribe(
			response =>{
				  this.listUsers = response.data;
					this.totalItems = response.total;
			},
			error =>{
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

  deleteUser(userId: string) {
    this.userService.deleteUser(userId).subscribe(
      data => {
        this.getAllUser();
      });
  }

  public showModal(userId: string) {
    this.userId = userId;
    this.modal.show();
  }

  ok() {
    this.userService.deleteUser(this.userId).subscribe(
      data => {
        this.getAllUser();
      }
    );
    this.modal.hide();
  }

  addNew() {
    console.log("role",JSON.stringify(this.role));
    this.openCreateModal(this.listRole);
  }

  openCreateModal(roles: string[]) {
    this.bsModalRef = this.modalService.show(CreateUserComponent);
    this.bsModalRef.content.roleData = roles;
    this.bsModalRef.content.title = "Add new User";
    this.modalService.onHide.subscribe(data => this.getAllUser(),
      err => {
        console.log(err);
      });
  }

  editUser(userId: string) {
    this.findUserById(userId, true);
  }

  viewUser(userId: string) {
    this.findUserById(userId,false);
  }

  findUserById(userId: string,disableInput: boolean): void {
    this.userService.findOne(userId).subscribe(
      data => {
        this.user = data;
        this.role = data.roles[0];
        this.openEditModal(this.listRole, this.user, this.role,disableInput);
      }
    );
  }

  openEditModal(roles: string[], user: User, role: Role,disableInput: boolean) {
    this.bsModalRef = this.modalService.show(EditUserComponent);
    this.bsModalRef.content.roleData = roles;
    this.bsModalRef.content.user = user;
    this.bsModalRef.content.role = role;
    this.bsModalRef.content.disableInput = disableInput;
    this.modalService.onHide.subscribe(data => this.getAllUser(),
      err => {
        console.log(err);
      });
  }

	pageChanged(event: any): void {
		this.currentPage = event.page;
		this.getAllUser();
	}



}

