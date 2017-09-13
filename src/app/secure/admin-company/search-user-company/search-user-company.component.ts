import {Component, OnInit, Output, EventEmitter, Input, ContentChild, ContentChildren, QueryList} from '@angular/core';

@Component({
  selector: 'app-search-user-company',
  templateUrl: './search-user-company.component.html',
  styleUrls: ['./search-user-company.component.css']
})
export class SearchUserCompanyComponent implements OnInit {
  @Input() listRole: string[];
  @Input() userTypes: string[];
  @Output() clicked = new EventEmitter<any>();

  public currentUserData: any;
  public currentUserCompanyId: any;
  public currentUserCompany;

  public fullNameEmail: string = '';
  public roles: string = '';
  public userType: string = '';

  constructor() {
    this.currentUserData = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUserCompanyId = this.currentUserData.user.company.companyId;
  }

  searchUser() {
    const criteria = {
      fullName: this.fullNameEmail,
      role: this.roles,
      userType: this.userType,
      companyId: this.currentUserCompanyId
    };
    this.clicked.emit(criteria);
  }

  refresh() {
    this.fullNameEmail = '';
    this.roles = '';
    this.userType = '';
    this.clicked.emit({ companyId: this.currentUserCompanyId});
  }

  ngOnInit() {
  }

}
