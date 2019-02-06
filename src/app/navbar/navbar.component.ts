import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../shared/services.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  log : string;
  isLogin : boolean = false;
  userClaims : any;
  user : string = "My Trips";

  constructor(private _router: Router,
              private service: ServicesService,
              private toastr : ToastrService) { }

  ngOnInit() {
    this.log = localStorage.getItem("yes");

    if(this.log == "login")
    {
      this.isLogin = true; 
      this.user = localStorage.getItem("username");
    }
  
  }

  out() {
    this.isLogin = false;
    localStorage.setItem("yes","out")
    window.localStorage.clear();
    window.location.reload();
  }

}
