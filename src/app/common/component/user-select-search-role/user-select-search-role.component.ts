import {Component, OnInit, Input, ElementRef} from '@angular/core';

@Component({
  selector: 'app-user-select-search-role',
  templateUrl: './user-select-search-role.component.html',
  styleUrls: ['./user-select-search-role.component.css']
})
export class UserSelectSearchRoleComponent implements OnInit {
  @Input() listRole: string[];
  @Input() classAtrr: string;

  constructor() {
  }

  ngOnInit() {
  }

}
