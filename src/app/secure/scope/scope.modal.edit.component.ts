import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';

import {Scope, Activity} from './index';
import {ScopeService} from './scope.service';

@Component({
    selector: 'modal-content',
    templateUrl: './scope.modal.edit.html',
    providers: [ScopeService]
})
export class ScopeModalEditComponent implements OnInit {
    activities: Activity[];
    title: string;
    isEditName: boolean;
    scope: Scope;
    dropdownList = [];
    selectedItems = [];
    dropdownSettings = {};

    constructor(public bsModalRef: BsModalRef, private scopeService: ScopeService) {
    }

    ngOnInit() {
        this.loadActivities();

        this.dropdownSettings = {
            singleSelection: false,
            text: 'Select Activities',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: true,
            classes: 'myclass custom-class'
        };
    }

    loadActivities() {
        this.scopeService.getActivities().subscribe(
            activities => {
                this.activities = activities;
                this.activities.forEach((activity) => {
                    this.dropdownList.push({id: activity.id, itemName: activity.method + ' - ' + activity.url});
                });
                this.selectedItems.push(this.dropdownList[1]);
            },
            err => {
                console.log(err);
            });
    }

    save() {
        console.log(this.scope);
        console.log(this.selectedItems);
    }

}
