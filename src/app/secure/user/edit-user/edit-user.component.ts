import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {User} from '../user.model';
import {Role} from '../role.model';
import {UserService} from '../user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  providers: [UserService]
})
export class EditUserComponent implements OnInit {
  roleData = [];
  user: User;
  role: Role;
  disableInput: boolean;
  title: string;

  constructor(public bsModalRef: BsModalRef, private userService: UserService) {
    this.user = this.user || new User();
    this.role = this.role || new Role();
  }

  ngOnInit() {
  }

  updateUser(isValid: boolean, user: User, roleId: string) {
    this.user.roles = [];
    if (isValid) {
      if (roleId) {
        this.user.roles.push({id: roleId});
      }
      this.userService.updateUsers(this.user).subscribe(
        data => this.bsModalRef.hide(),
        err => {
          console.log(err);
        });
    } else {
      return;
    }
  }


}
