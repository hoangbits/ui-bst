import {Component, OnInit, ViewChild} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {ModalDirective} from 'ngx-bootstrap/modal/modal.component';
import {RoleService} from '../role.service';
import {EditRoleComponent} from '../edit-role/edit-role.component';
import {Scope} from '../scope.model';
import {Role} from '../role.model';
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
  roleId: string;
  bsModalRef: BsModalRef;
  isEdit: boolean;
  isSaveConfig: boolean;
  selectedItems = [];
  dropdownList = [];

  @ViewChild(ModalDirective) public modal: ModalDirective;

  constructor(private roleService: RoleService, private modalService: BsModalService) {
    this.getAllRoles();
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

  deleteRole(roleId: string) {
    this.roleService.deleteRole(roleId).subscribe(
      data => {
        this.getAllRoles();
      }
    );
  }

  public showModal(roleId: string) {
    this.roleId = roleId;
    this.modal.show();
  }

  ok() {
    this.roleService.deleteRole(this.roleId).subscribe(
      data => {
        this.getAllRoles();
      }
    );
    this.modal.hide();
  }

  editName(roleId: string) {

    this.roleService.findOne(roleId).subscribe(
      data => {
        this.role = data;
        this.openEditModal('Edit Name', true, data.roles, '', '', true);
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
        this.openEditModal('Edit Scope', false, data.roles, this.selectedItems, this.dropdownList, true);
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
        this.openEditModal('Add new Role', true, new Role(), [], dropdownList, false);
      },
      err => {
        console.log(err);
      });

  }

  openEditModal(title, isEdit, data?: Role, selectedItems?: any, dropdownList?: any, isSaveConfig?: boolean) {
    this.bsModalRef = this.modalService.show(EditRoleComponent);
    this.bsModalRef.content.title = title;
    this.bsModalRef.content.isEdit = isEdit;
    this.bsModalRef.content.role = data;
    this.bsModalRef.content.isSaveConfig = isSaveConfig;
    this.bsModalRef.content.selectedItems = selectedItems;
    this.bsModalRef.content.dropdownList = dropdownList;
    this.modalService.onHide.subscribe(() => this.getAllRoles());
  }

}
