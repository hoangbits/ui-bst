import {Component, OnInit} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {ScopeModalEditComponent} from './scope.modal.edit.component';

import {MdDialog} from '@angular/material';
import {AlertDialog} from '../dialog/alert.dialog.component';

import {Scope} from './index';
import {ScopeService} from './scope.service';

@Component({
  selector: 'app-scope',
  templateUrl: './scope.component.html',
  providers: [ScopeService],
})
export class ScopeComponent implements OnInit {
  bsModalRef: BsModalRef;
  scopes: any[];

  // Pagination setting
  currentPage: number = 0;
  itemsPerPage: number = 10;
  totalItems: number = 0;
	indexPage: number = 0;

  constructor(private scopeService: ScopeService,
              private modalService: BsModalService,
              private dialog: MdDialog) {
    this.loadScopes();

  }

  loadScopes() {
    this.scopeService.getScopes(this.itemsPerPage, this.currentPage).subscribe(
      result => {
        this.scopes = result.scopes;
        this.totalItems = result.meta.paginate.totalCount;
      },
      err => {
        this.dialog.open(AlertDialog, {
          width: '500px', height: '170px', data: {
            title: 'Information dialog', message: 'Load scope list has error, contact administrator to help'
          }
        });
      });
  }

  ngOnInit() {
  }

  public showModal(id) {
    this.dialog.open(AlertDialog, {
      width: '400px', height: '170px', data: {
        title: 'Confirm dialog', message: 'Are you sure you want to delete this item?'
      }
    }).afterClosed().subscribe(result => {
      if (result === 'OK') {
        this.scopeService.removeScope(id).subscribe(() => {
          this.loadScopes();
        });
      }
    });
  }

  addNew() {
    this.openEditModal('Add new Scope', true, new Scope(), true);
  }

  editName(scope) {
    this.openEditModal('Edit Scope', true, scope);
  }

  editActivity(scope) {
    this.openEditModal('Config Scope', false, scope);
  }

  openEditModal(title, isEditName, data?: Scope, isAddNew: boolean = false) {
    this.bsModalRef = this.modalService.show(ScopeModalEditComponent);
    this.bsModalRef.content.title = title;
    this.bsModalRef.content.isEditName = isEditName;
    this.bsModalRef.content.scope = data;
    this.bsModalRef.content.isAddNew = isAddNew;

    this.modalService.onHide.subscribe(() => {
      this.loadScopes();
    });
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
		this.indexPage = this.currentPage > 1 ? (this.currentPage - 1) * this.itemsPerPage : 0;
    this.loadScopes();
  }
}
