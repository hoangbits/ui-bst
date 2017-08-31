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

  constructor() {
  }

  onClick(fullName: string, userType: string, role: string) {
    const criteria = {
      fullName: fullName,
      role: role,
      userType: userType
    };

    this.clicked.emit(criteria);
  }

  ngOnInit() {
  }

}
