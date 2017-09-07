import { Component, OnInit, Input,ElementRef } from '@angular/core';

@Component({
  selector: 'app-user-select-search-user-type',
  templateUrl: './user-select-search-user-type.component.html',
  styleUrls: ['./user-select-search-user-type.component.css']
})
export class UserSelectSearchUserTypeComponent implements OnInit {

  @Input() userTypes: string[];
  @Input() classAtrr: string;


  constructor() { }

  ngOnInit() {
  }

}
