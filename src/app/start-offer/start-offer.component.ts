import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { ServicesService } from '../shared/services.service';
import { Alert } from 'selenium-webdriver';
import {BidService } from '../shared/bid.service'
import { Room } from '../shared/room.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-start-offer',
  templateUrl: './start-offer.component.html',
  styleUrls: ['./start-offer.component.css']
})
export class StartOfferComponent implements OnInit {

  details: any;
  rating:any
  hotelResults : any;
  hotelResults2 : any;
  allHotels : any;
  filterHotel : any;
  allRooms : any;
  manager_id: any[];
  yes : string[];
  id: any; 
  id2 : any;
  roomsSearched : any;
  roomsAboveZero : any;
  todayDate : any;
  roomsAvail : any;
  result : any;
  roomSearch : any;
  resultsHotel : any;
  chosenHotel : any;
  roomsByID : any;
  priceRandom : any;
  room : any;
  price: any;
  roomLeft : any;
  userRating:any;
  ratings: any= ['5','4','3','2']
  ChosenArea:any
  constructor(private _router : Router,private _location: Location,private service: ServicesService, private bidService : BidService,
    private toastr : ToastrService) { }
  
  backClicked() {
    this._location.back();
  }


  ngOnInit() {

    this.details = JSON.parse(localStorage.getItem("details"))
    this.resultsHotel = JSON.parse(localStorage.getItem("hotelResults"))
    console.log("Hotel Results",this.resultsHotel)
    
    this.service.getAllHotels().subscribe((data: any) => {
      this.allHotels = data;
    

    this.service.getAllRooms().subscribe((data : any) => {

      this.allRooms = data;

     this.bidService.deleteUnAvailableRooms(this.allRooms)

      this.todayDate = new Date().toISOString().split('T')[0]; 

      this.roomsAvail = this.bidService.returnRoomsAvailable(this.allRooms,this.todayDate)

      this.roomsAboveZero = this.bidService.returnRoomsAboveZero(this.roomsAvail);   
    });
  });
  }

  PreviewBid(){
    localStorage.setItem("rating",this.rating);

    //this.ChosenArea = localStorage.getItem("chosenArea").toString()
    //console.log(this.ChosenArea)   
    this.filterHotel = this.bidService.searchByLocationAndRating(this.resultsHotel,"Johannesburg",parseInt(this.userRating))

    //this.filterHotel = this.bidService.searchByLocationAndRating(this.resultsHotel, this.ChosenArea,parseInt(this.userRating))

    if(this.filterHotel.length == 0)
    {
      this.toastr.error('No results found for your selected city and rate')
    }
    else
    {
      localStorage.setItem("provRate", JSON.stringify(this.filterHotel));
      console.log("Filtered by city & rate",this.filterHotel)

      this.chosenHotel = this.bidService.randomizeHotel(this.filterHotel)
      localStorage.setItem("chosenHotel", JSON.stringify(this.chosenHotel));
      console.log("chosen hotel",this.chosenHotel)

        this.service.getRoomDetails(this.chosenHotel.hotelMan_id).subscribe((data: any) =>{
        this.roomsByID = data;

        this.roomsAboveZero = this.bidService.returnRoomsAboveZero(this.roomsByID); 
        console.log("rooms above zero",this.roomsAboveZero)

        localStorage.setItem("roomsByID", JSON.stringify(this.roomsAboveZero));
        console.log("All Rooms by hotel manger ID",this.roomsByID) 

       this.priceRandom  = this.bidService.randomizeByPrice(this.roomsAboveZero,this.price)
       localStorage.setItem("priceRandom", JSON.stringify(this.priceRandom));
      
        console.log("price",this.priceRandom) 
        

        this.roomSearch = this.bidService.getRoomsNo(this.priceRandom,this.details.roomCount,this.details.startDate,this.details.endDate);
        console.log("filterRooms",this.roomSearch)
        if(this.roomSearch.length == 0)
        {
          this.toastr.warning('No rooms available','Try again later')
          this._router.navigate(['/startOffer']);
        }
        else
        {
          this.toastr.warning('rooms found for your search',this.roomSearch.length)
          //console.log("aaaa",this.roomSearch)

          this.room = this.bidService.randomizeHotel(this.roomSearch)
          if(this.room != "undefined")
          {
            localStorage.setItem("priceRandom", JSON.stringify(this.room));
            localStorage.setItem("bidprice", JSON.stringify(this.price));
            this._router.navigate(['/previewoffer']);
          }
 
          console.log("chosen room",this.room)

          this.roomLeft = this.bidService.roomsLeft(this.room,this.details.roomCount)
          localStorage.setItem("RoomsLeft", JSON.stringify(this.roomLeft));
          console.log("RoomsLeft",this.roomLeft)
        }
     
        });
    }

    
  }

  selectedRate(event: any){

      this.userRating = event.target.value;
  }

  selectedArea(event: any){

      
  }
}