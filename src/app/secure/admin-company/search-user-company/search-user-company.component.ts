import {Component, OnInit, Output, EventEmitter, Input, ContentChild, ContentChildren, QueryList } from '@angular/core';

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
  public currentUserCompany

  constructor() {
    this.currentUserData = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUserCompanyId = this.currentUserData.user.company.companyId;
  }

  onClick(fullName: string, userType: string, role: string) {
    const criteria = {
      fullName: fullName,
      role: role,
      userType: userType,
      companyId: this.currentUserCompanyId
    };
    console.log('tim kiem', JSON.stringify(criteria));
    this.clicked.emit(criteria);
  }


  ngOnInit() {
  }

}
