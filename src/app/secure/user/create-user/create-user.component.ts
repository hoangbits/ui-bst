import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {User} from '../user.model';
import {UserService} from '../user.service';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  providers: [UserService]
})
export class CreateUserComponent implements OnInit {


  myForm: FormGroup; // our model driven form
  submitted: boolean; // keep track on whether form is submitted

  constructor(public bsModalRef: BsModalRef, private _fb: FormBuilder,private userService: UserService) { }
  roleData = [];
  
  ngOnInit() {
      this.myForm = new FormGroup({
      email: new FormControl('', [<any>Validators.required]),
      fullName: new FormControl('', [<any>Validators.required]),
      roles: new FormControl(''),
    });
  }

   save(model: User, isValid: boolean) {
     this.submitted = true; // set form submit to true
     console.log(model, isValid);
     if(isValid){
        this.userService.createUsers(model).subscribe(
        data => this.bsModalRef.hide(),
        err => {
          console.log(err);
        }); 
     }
  }

}
