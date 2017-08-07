import {Component, OnInit, ViewChild} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {ScopeModalEditComponent} from './scope.modal.edit.component';

import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

import {Scope} from './index';
import {ScopeService} from './scope.service';

@Component({
    selector: 'app-scope',
    templateUrl: './scope.component.html',
    providers: [ScopeService],
})
export class ScopeComponent implements OnInit {
    bsModalRef: BsModalRef;
    scopes: Scope[];

    @ViewChild(ModalDirective) public modal: ModalDirective;

    constructor(private scopeService: ScopeService, private modalService: BsModalService) {
        this.loadScopes();
    }

    loadScopes() {
        this.scopeService.getScopes().subscribe(
            scopes => {
                this.scopes = scopes;
            },
            err => {
                console.log(err);
            });
    }

    ngOnInit() {
    }

    public showModal() {
        this.modal.show();
    }

    ok(){
        // TODO implement next action
        this.modal.hide();
    }
    addNew() {
        this.openEditModal('Add new Scope', true, new Scope('', []));
    }

    editName(scope) {
        this.openEditModal('Edit Scope', true, scope);
    }

    editActivity(scope) {
        this.openEditModal('Edit Scope activities', false, scope);
    }

    openEditModal(title, isEditName, data?: Scope) {
        debugger
        /*if(data){
            // TODO implement data template for dropdownlist binding
            var d = [];
            _.data.activities.each(activity=>{
d.push({id:activity.id, itemName:activity.method + ' - ' + activity.url});
            });
            data.activities = d;
            console.log(data.activities);
        }*/
        this.bsModalRef = this.modalService.show(ScopeModalEditComponent);
        this.bsModalRef.content.title = title;
        this.bsModalRef.content.isEditName = isEditName;
        this.bsModalRef.content.scope = data;
    }
}
