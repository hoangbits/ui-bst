import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
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
  passDefault = '123456';

  constructor(public bsModalRef: BsModalRef, private userService: UserService) {
  }


  ngOnInit() {
    this.user = this.user || new User();
    this.userOther = this.userOther || new User();
  }

  saveOtherUser(formValue: any, idRole: string, isValid: boolean) {

    if (isValid) {
      if (idRole) {
        this.roleId.push({id: idRole});
      }
      this.userOther.email = formValue.emailOrther;
      this.userOther.fullName = formValue.fullNameOrther;
      this.userOther.password = formValue.password;
      this.userOther.userType = '1';
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
      this.user.userType = '0';
      this.user.password = this.passDefault;
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
