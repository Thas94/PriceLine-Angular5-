import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Response, RequestMethod, RequestOptions,Headers,Http} from "@angular/http";
import { User } from './user.model';
import { Bid } from './bid.model';
import { Room} from './room.model'
import {Hotel} from './hotel.model'
import { element } from 'protractor';
import { BankDetails } from './bank-details.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  bank : BankDetails;
  hotel : Room;
  address : Hotel;
  private isUserLoggedIn; //I
  selectedUser: User; //I
  userList: User[]; //I
  hotelAdd : Hotel[];
  hotelList : Room[];

  readonly url = environment.rootUrl;

  constructor(private http: HttpClient,private http1 : Http) { 
    this.isUserLoggedIn = false; //I
  }

  /* Registering a user */
  registerUser(user: User, roles: string[]) {
    const body = {
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName, 
      LastName: user.LastName,
      Roles : roles
    }
    return this.http.post(this.url +'/api/User/Register', body);
  }

  //I
  getAllUsers() {
    return this.http.get(this.url + '/api/GetUsers')
      .map((data: Response) =>{
        return data.json() as User[];
      }).toPromise().then(x => {
        this.userList = x;
        alert("Service Service "+ x);
      })
  }

  /* Adding banking details */

  registerBankDetails(emp : BankDetails){
    var body = JSON.stringify(emp);
    var headerOptions = new Headers({'Content-Type' : 'application/json', 'Authorization':'Bearer'+ localStorage.getItem('userToken')});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions}); 
    return this.http1.post(this.url +'/api/BankDetails',body,requestOptions).map(x => x.json());
  }

  addHotel(emp : Hotel){
    var body = JSON.stringify(emp);
    var headerOptions = new Headers({'Content-Type' : 'application/json', 'Authorization':'Bearer'+ localStorage.getItem('userToken')});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions}); 
    return this.http1.post(this.url +'/api/Hotels',body,requestOptions).map(x => x.json());
  }

  PlaceBid(emp : Bid){
    var body = JSON.stringify(emp);
    var headerOptions = new Headers({'Content-Type' : 'application/json', 'Authorization':'Bearer'+ localStorage.getItem('userToken')});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions}); 
    return this.http1.post(this.url +'/api/Bids',body,requestOptions).map(x => x.json());
  }

  sendEmail(id : string ,numRooms : string ,accomodations : string , price : string, checkin : string, checkout : string, fname :string, lname : string, email :string)
  {
   
    return this.http.get(this.url + '/api/Email/'+id+'?numRooms='+numRooms+"&accomodations="+accomodations+"&price="+price+"&checkin="+checkin+"&checkout="+checkout+"&fname="+fname+"&lname="+lname+"&email="+email);
  
  }

  addRooms(emp : Room){
    var body = JSON.stringify(emp);
    var headerOptions = new Headers({'Content-Type' : 'application/json', 'Authorization':'Bearer'+ localStorage.getItem('userToken')});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions}); 
    return this.http1.post(this.url +'/api/Rooms',body,requestOptions).map(x => x.json());
  }

  userAuthentication(userName, password) {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    return this.http.post(this.url + '/token', data, { headers: reqHeader });
  }


   getAllRoles() {
    var requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.get(this.url + '/api/GetAllRoles', { headers: requestHeader });
  }
  
  //I
  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var userRoles: string[] = JSON.parse(localStorage.getItem('userRoles'));
    //debugger;
    
    allowedRoles.forEach(element => {
      if (userRoles.indexOf(element) > -1) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }


  //I
  setUserLoggedIn() {
    this.isUserLoggedIn = true;
  }

  getUserLoggedIn() {
    return this.isUserLoggedIn;
  }

  SearchHotelsDestination(prov : string)
  {
    return this.http.get(this.url + '/api/Hotels?prov='+prov,
    {
      headers : new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('userToken')})
    });
    
  }

//Get all hotels added by the currengt logged in hotel manager  
  getHotelDetails(id) {
    return this.http.get(this.url + '/api/hotels/'+id,
    {
      headers : new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('userToken')})
    });
  }

  getRoomDetails(id) {
    return this.http.get(this.url + '/api/Rooms/'+id,
    {
      headers : new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('userToken')})
    });
  }

  getBankDetailsID(id) {
    return this.http.get(this.url + '/api/BankDetails/'+id,
    {
      headers : new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('userToken')})
    });
  }

  getBidDetailsID(id) {
    return this.http.get(this.url + '/api/Bids/'+id,
    {
      headers : new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('userToken')})
    });
  }

  getAllHotels() {
    return this.http.get(this.url + '/api/hotels',
    {
      headers : new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('userToken')})
    });
  }

  getAllRooms() {
    return this.http.get(this.url + '/api/Rooms',
    {
      headers : new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('userToken')})
    });
  }

  putHotel(Id , hoteldet : Room){
   
    return this.http.put(this.url +'/api/Rooms/'+ Id, hoteldet,
    {
      headers : new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('userToken')})
    });
  }

  UpdateBankDetails(Id , bank : BankDetails){
   
    return this.http.put(this.url +'/api/BankDetails/'+ Id, bank,
    {
      headers : new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('userToken')})
    });
  }
  
    deleteRooms(id : any)
    {

    console.log(id);
    return this.http1.delete(this.url + '/api/Rooms/'+id).map(res => res.json());

    }
}