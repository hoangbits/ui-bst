import {Component, OnInit, Input, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-user-text-search-email',
  templateUrl: './user-text-search-email.component.html',
  styleUrls: ['./user-text-search-email.component.css']
})
export class UserTextSearchEmailComponent implements OnInit {
  @Input() classAtrr: string;
  @ViewChild('fullName')
  private elName: ElementRef;

  constructor() {
  }

  ngAfterViewInit() {
   // console.log(this.elName.nativeElement);
     this.elName.nativeElement.value = 'red';
  }

  ngOnInit() {
  }

}
