import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { User } from '../user.model';
import { Role } from '../role.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  providers: [UserService]
})
export class EditUserComponent implements OnInit {

  myForm: FormGroup; // our model driven form
  submitted: boolean; // keep track on whether form is submitted
  roleData = [];
  user: User;
  roleId = []
  role: Role;

  constructor(public bsModalRef: BsModalRef, private _fb: FormBuilder, private userService: UserService) {
    this.user = this.user || new User();
    this.role = this.role || new Role('', '');
  }

  ngOnInit() {
  }


  updateUser(isValid: boolean, user: User, roleId: string) {
    if (isValid) {
      if (roleId) {
        this.roleId.push({ id: roleId });
      }
      this.userService.updateUsers(user, this.roleId).subscribe(
        data => this.bsModalRef.hide(),
        err => {
          console.log(err);
        });
    } else {
      return;
    }
  }


}
