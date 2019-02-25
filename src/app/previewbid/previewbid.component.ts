import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { BidService } from '../shared/bid.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User } from '../shared/user.model';
import { ServicesService } from '../shared/services.service';
import { UserService } from '../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-previewbid',
  templateUrl: './previewbid.component.html',
  styleUrls: ['./previewbid.component.css']
})
export class PreviewbidComponent implements OnInit {
  details: any
  bidprice:any
  subtotal:number
  totalPrice:number 
  tax:number
  numDays:any
  rating:string

  foundId : any;
  id : any;


  roomCount = "1 Room"
  userClaims : any;
  user : User;
  isLoginError : boolean = false;
  load : boolean;
  yes : string;
  
  roles : any[];
  numNights : any;
  managerID;
  x : any;
  hotelResults : any;

  manager : any ='Hotel_Manager'; 


  hide : boolean = false;


  constructor(private _location: Location,private bidService : BidService, private toastr : ToastrService,private _router : Router,
    private service : ServicesService,
    private userService  : UserService) { }

  ngOnInit() {

    this.id = localStorage.getItem('user_id')
    console.log("user ID",this.id)
    

    //this.bidprice = localStorage.getItem("bidprice");
    this.details = JSON.parse(localStorage.getItem("details"))
    this.bidprice = JSON.parse(localStorage.getItem("bidprice"))
    this.numDays = localStorage.getItem("numDays");
    this.rating = localStorage.getItem("rating");
    this.foundId = (localStorage.getItem("rate"))
    this.calculateSubtotal()

  }

  login(username,password) {
    this.service.userAuthentication(username, password).subscribe((data : any) => {
      localStorage.setItem('userToken', data.access_token);
      localStorage.setItem('userRoles', data.role);
      localStorage.setItem('username', username);
      this.toastr.success('Sign In successful.');
      this.yes = "login";
      this.load = true;
      localStorage.setItem("yes",this.yes);
   
      this.userService.getUserClaims().subscribe((data :any ) => {
        this.userClaims = data;
        //console.log("XFBVDF",this.userClaims.Id)
        localStorage.setItem("username", this.userClaims.UserName);
        localStorage.setItem("user_id", this.userClaims.Id);
        
      });
  
         
       
       window.location.reload();
   
    },
    (err : HttpErrorResponse)=>{
      this.toastr.error('Incorrect username or password');
    });

    if(this.load == true)
    {
      this.userService.getUserClaims().subscribe((data :any ) => {
        this.userClaims = data;
        localStorage.setItem("username", this.userClaims.UserName);
        localStorage.setItem("user", this.userClaims.Id);
      });
    }
  }


  Next()
  {
    if(this.id == null)
    {
      this.toastr.error('Not Logged in','Log in to continue')
      this.hide = true
    }
    else
    {
      this.hide = false
      this._router.navigate(['/payment']);
    }
  }

  backClicked() {
    this._location.back();
  }

  calculateSubtotal(){
    var bookingData = JSON.parse(localStorage.getItem("details"))
  
    this.subtotal = this.bidprice * this.numDays * bookingData.roomCount
    this.tax = this.subtotal * 15/100 + 40
    this.totalPrice = this.subtotal + this.tax
  }

}
