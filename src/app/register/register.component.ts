import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../shared/user.model';
import { ServicesService } from '../shared/services.service';
import {ToastrService} from 'ngx-toastr';
import { UserService } from '../shared/user.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user : User;
  roles : any[];
  //emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private service: ServicesService,
              private userService: UserService,
              private toastr : ToastrService) { }

  ngOnInit() {
    this.resetForm();
    this.service.getAllRoles().subscribe(
      (data : any) => {
        data.forEach(obj => obj.selected = false);
        this.roles = data;
      }
    );
  }
 
  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = {
      UserName: '',
      Password: '',
      Email: '',
      FirstName: '',
      LastName: ''
    }
    if (this.roles)
      this.roles.map(x => x.selected = false);
 }

 customerSignup(registerForm: NgForm) 
 { 
   //this.resetForm(registerForm);
   //console.log(registerForm.value);
    var x = this.roles.filter(x => x.selected).map(y => y.Name)
    this.service.registerUser(registerForm.value, x)
    .subscribe((data: any) => 
    {
      if (data.Succeeded == true) 
      {
        this.resetForm(registerForm);
        this.toastr.success('User registration successful');
        
      }
      else
      {
        this.toastr.error('User registration failed',data.Errors[0]);
      }
    }); 
  }

  updateSelectedRoles(index){
    this.roles[index].selected = !this.roles[index].selected;
  }
}
