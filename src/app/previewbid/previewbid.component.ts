import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { BidService } from '../shared/bid.service';

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

  price : any;
  randomPrice : any;
  roomLeft : any;
  roomSearch : any;
  priceRandom : any;

  constructor(private _location: Location,private bidService : BidService) { }

  ngOnInit() {

    this.bidprice = localStorage.getItem("bidprice");
    this.details = JSON.parse(localStorage.getItem("details"))
    this.priceRandom = JSON.parse(localStorage.getItem("priceRandom"))
    this.bidprice = JSON.parse(localStorage.getItem("bidprice"))
    this.numDays = localStorage.getItem("numDays");
    this.rating = localStorage.getItem("rating");
    this.foundId = (localStorage.getItem("rate"))
    this.calculateSubtotal()

    console.log("kk",this.foundId)
    this.roomSearch = this.bidService.getRoomsNo(this.foundId,this.details.roomCount,this.details.startDate,this.details.endDate);
    console.log("aaaa",this.roomSearch)

   this.randomPrice = this.bidService.randomizeByPrice(this.roomSearch,this.bidprice)
   console.log("UU",this.randomPrice)

   this.roomLeft = this.bidService.roomsLeft(this.randomPrice,this.details.roomCount)
   this.roomLeft = this.bidService.roomsLeft(this.priceRandom,this.details.roomCount)
   localStorage.setItem("bidDetails", JSON.stringify(this.roomLeft));
   
   //console.log("OOO",this.roomLeft) 
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
