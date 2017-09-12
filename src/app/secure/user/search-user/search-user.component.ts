import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {
  @Input() listRole: string[];
  @Input() userTypes: string[];
  @Output() clicked = new EventEmitter<any>();

  private fullNameEmail: string = '';
  private roles: string = '';
  private userType: string = '';

  constructor() {
  }



  searchUser() {

    const criteria = {
      fullName: this.fullNameEmail,
      role: this.roles,
      userType: this.userType,
    };
    this.clicked.emit(criteria);
  }

  refresh() {
    this.fullNameEmail = '';
    this.roles = '';
    this.userType = '';
    this.clicked.emit({});
  }

  ngOnInit() {
  }

}
