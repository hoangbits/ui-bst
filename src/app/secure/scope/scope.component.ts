import {Component, OnInit} from '@angular/core';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';
import {Scope, Activity} from './index';
import {SelectItem} from './selectItem.model';
import {ScopeService} from './scope.service';

@Component({
    selector: 'app-scope',
    templateUrl: './scope.component.html',
    providers: [ScopeService]
})
export class ScopeComponent implements OnInit {

    scopeForm: FormGroup;
    scopes: Scope[];
    activities: Activity[];
    scope: Scope;
    isEdit: boolean;

    dropdownList = [];
    selectedItems = [];
    dropdownSettings = {};

    constructor(private scopeService: ScopeService) {
        this.loadScopes();
        this.loadActivities();

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

    loadActivities() {
        this.scopeService.getActivities().subscribe(
            activities => {
                this.activities = activities;
                this.activities.forEach((activity) => {
                    this.dropdownList.push(new SelectItem(activity.id, activity.method + ' - ' + activity.url));
                });
                this.selectedItems.push(this.dropdownList[1]);
            },
            err => {
                console.log(err);
            });
    }

    ngOnInit() {
        this.scopeForm = new FormGroup({
            scopeName: new FormControl('', Validators.required),
            activities: new FormControl()
        });

        this.scope = new Scope('', []);
        this.isEdit = false;

        this.dropdownSettings = {
            singleSelection: false,
            text: 'Select Activities',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: true,
            classes: 'myclass custom-class'
        };

    }

    onItemSelect(item: any) {
        console.log(item);
        console.log(this.selectedItems);
    }

    OnItemDeSelect(item: any) {
        console.log(item);
        console.log(this.selectedItems);
    }

    onSelectAll(items: any) {
        console.log(items);
    }

    onDeSelectAll(items: any) {
        console.log(items);
    }

    save(f) {
        console.log(f.value);
        console.log(f.valid);
    }

    addNew() {
        this.scopeForm.reset();
        this.isEdit = !this.isEdit;
    }
}
