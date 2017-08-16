import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {FormBuilder} from '@angular/forms';
import {User} from '../user.model';
import {UserService} from '../user.service';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  providers: [UserService]
})
export class CreateUserComponent implements OnInit {
  user: User;
  userOther: User;
  roleData = [];
  roleId = [];
  title: string;

  constructor(public bsModalRef: BsModalRef, private userService: UserService) {
  }


  ngOnInit() {
    this.user = this.user || new User();
    this.userOther = this.userOther || new User();
  }

  saveOtherUser(model: User, idRole: string, isValid: boolean) {
    if (isValid) {
      if (idRole) {
        this.roleId.push({id: idRole});
      }
      this.userOther.roles = this.roleId;
      this.userService.createUsers(this.userOther).subscribe(
        data => this.bsModalRef.hide(),
        err => {
          console.log(err);
        });
    } else {
      return;
    }
  }

  saveAdUser(model: User, idRole: string, isValid: boolean) {
    if (isValid) {
      if (idRole) {
        this.roleId.push({id: idRole});
      }
      this.user.roles = this.roleId;
      this.userService.createUsers(this.user).subscribe(
        data => this.bsModalRef.hide(),
        err => {
          console.log(err);
        });
    } else {
      return;
    }
  }
}
