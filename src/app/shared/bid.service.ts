import { Injectable } from '@angular/core';
import { ServicesService } from './services.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions,RequestMethod } from '@angular/http';
import { Response } from '@angular/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BidService {

  readonly url = environment.rootUrl;

  constructor(private service: ServicesService,private toastr : ToastrService,private http : Http) { }

  getRoomsNo(obj : any,rooms : number,startD : any,endD : any) : any
  {
    var filt = obj.filter(x => x.numRooms >= rooms && x.startDate == startD && x.endDate == endD);
    console.log("EEE",obj)
    return filt;
  }

  roomsLeft(obj : any,rooms : number) : any{
    var room = obj.numRooms - rooms;
    obj.numRooms = room;

    if(obj.numRooms <= 0)
    {
      //rooms are fully booked,therefore delete from database
    }
    return obj;
  }


  searchByLocationAndRating(obj : any,city: string,rating : number) : string[]
  {  
    var filt = obj.filter(x => x.City == city && x.rating == rating);
    if(filt == null)
    {
      alert("No Results found under your search criteria of a city and rating")
    }
    console.log("thas",obj)
    console.log("malix",filt)
    return filt;
  }

  randomizeByPrice(obj : any,amt : any) : any
  {
    var amount = obj.filter(x => x.room_Price <= amt)
    return amount;
  }

  randomizeHotel(obj : any) : any
  {
    for(var i = 0;i < obj.length;i++)
    {
        var k = Math.floor(Math.random() * obj.length);
        var p = obj[k];    
    }
    return p;
  }

  findHotelForRoom(obj : any,id : string) : any
  {
    var findID = obj.filter(x => x.hotelMan_id == id)
    return findID;
  }

  returnRoomsAboveZero(obj : any) : any{
    var k = obj.filter(x => x.numRooms != 0)
    return k;
  }

  returnRoomsAvailable(obj : any, date : any) : any
  {
    var k = obj.filter(x => x.endDate != date)
    return k;
  }

  deleteUnAvailableRooms(obj : any) : any{
    var date = new Date().toISOString().split('T')[0];
    var k = obj.filter(x => x.endDate == date || x.numRooms == 0)
    var id;
    for(var i = 0;i < k.length;i++)
    {
     id = k[i].room_id
     return this.service.deleteRooms(k[i].room_id)
     .subscribe(x => {
       //this.toastr.warning("Deleted Successfully","Delete");
       window.location.reload();
     })    
    }
  }
}
