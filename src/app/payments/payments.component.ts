import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../shared/user.service';
import { ServicesService } from '../shared/services.service';
import { BidService } from '../shared/bid.service';
import { Router } from '@angular/router';
import { BankDetails } from '../shared/bank-details.model';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  constructor(private bidService : BidService, private service  : ServicesService,private userService :  UserService,  private toastr : ToastrService,private _router : Router) { }
  bidDetails : any;
  RoomsLeft : any;
  hotel : any;
  body : any;
  bid : any;
  id : any;
  bankDetails : any;
  bankD : BankDetails;
  mailBody : any;
  dateBody : any;
  userBody : any;
  priceRandom : any;
  chosenHotel : any;
  EnterBank : boolean = false;
  

  ngOnInit() {

    this.bankD = new BankDetails();

    this.id = localStorage.getItem('user_id')
    console.log("user ID",this.id)
    this.service.getBankDetailsID(this.id).subscribe((data : any)=>{
      this.bankDetails = data;
      
    this.priceRandom = JSON.parse(localStorage.getItem("priceRandom"))
    console.log("chosen room",this.priceRandom)
    console.log("user bank details",this.bankDetails)


      if(this.bankDetails.length <= 0)
      {
        this.EnterBank = false;
      }
      else
      {
        this.EnterBank = true;
      }


      this.bidDetails = JSON.parse(localStorage.getItem("details"))
      console.log("bidDetails",this.bidDetails)
      this.chosenHotel = JSON.parse(localStorage.getItem("chosenHotel"))
      console.log("chosen Hotel",this.chosenHotel)

      this.RoomsLeft = JSON.parse(localStorage.getItem("RoomsLeft"))
      console.log("RoomsLeft",this.RoomsLeft)
    })

   

  }

  registerBankDetails(form:NgForm) {
    console.log("YSDVFSD",form.value)
    this.service.registerBankDetails(form.value)
    .subscribe((data: any) => {
      if (data.Succeeded == true) {
        this.toastr.error('Failed to add bank details');
      }
      else {
        this.toastr.success('Bank details added to your account');    
        this.makePayment(); 
      }
    }); 
  }

  makePayment(): void{
    this.body = {
      contact_Person : this.priceRandom.contact_Person,
      endDate : this.priceRandom.endDate,
      numRooms : this.bidDetails.roomCount,
      room_Price : this.priceRandom.room_Price,
      room_Type : this.priceRandom.room_Type,
      startDate : this.priceRandom.startDate,
      user_id : this.id,
      City : this.chosenHotel.City,
      Country : this.chosenHotel.Country,
      Hotel_Name : this.chosenHotel.Hotel_Name,
      Province : this.chosenHotel.Province,
      phone_no : this.chosenHotel.phone_no,
      rating : this.chosenHotel.rating,
      street_Address : this.chosenHotel.street_Address,
      website : this.chosenHotel.website,
      zip_code : this.chosenHotel.zip_code
    }
    
    //search data ( dates )
     this.dateBody =JSON.parse(localStorage.getItem('details'));
     localStorage.setItem("body", JSON.stringify(this.body));
     console.log("body", this.body)
     //alert(this.body.Hotel_Name);
  
  
    this.mailBody = this.body;
    
    
    //Get details of the user that is bidding
    this.userService.getUser(this.mailBody.user_id).subscribe((data : any ) => {
     
      this.userBody =  data;
      //sends email
      this.service.sendEmail(this.mailBody.user_id,this.mailBody.numRooms,this.mailBody.Hotel_Name,
      this.mailBody.room_Price,this.dateBody.startDate,this.dateBody.endDate,this.userBody.FirstName,this.userBody.LastName,this.userBody.Email).subscribe((data : any ) => 
    {
      
      this.toastr.success(data);
      
    })
    });

      this.service.PlaceBid(this.body)
      .subscribe((data: any) => {
        if (data.Succeeded == true) {
        }
        else 
        {  
          this._router.navigate(['/bidresults']);
        }
      })

      this.service.putHotel(this.RoomsLeft.room_id,this.RoomsLeft)
      .subscribe((data: any) => {
        
      })
  }

}
