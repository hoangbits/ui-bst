import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
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

  myForm: FormGroup; // our model driven form
  submitted: boolean; // keep track on whether form is submitted
  roleData = [];
  user: User;
  roleId =[]
  role: Role;

  constructor(public bsModalRef: BsModalRef, private _fb: FormBuilder,private userService: UserService) {
    this.user = this.user || new User();
    this.role = this.role || new Role('','');
   }
  
  
  ngOnInit() {
  }

updateUser(userId: string,email: string,fullName: string,roleUser: string){
  console.log("userid ",userId,"name", fullName,"eamil",email,"role",roleUser);
  this.roleId.push({id: roleUser});
   this.userService.updateUsers(new User(userId,email,fullName,''),this.roleId).subscribe(
        data => this.bsModalRef.hide(),
        err => {
          console.log(err);
        }); 

}

onAddVP(isValid : boolean,user:User){
  console.log(user);
}

}
