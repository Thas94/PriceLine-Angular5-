import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions,RequestMethod } from '@angular/http';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Profile } from 'src/app/shared/profile.model';
import { User } from './user.model';
import { Users } from './users.interface';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersList: Users[];
  
  readonly url = environment.rootUrl;

  
  constructor(private httpclient : HttpClient , private http : Http) { }

  getUserClaims() {
    return this.httpclient.get(this.url + '/api/GetUserClaims',
    {
      headers : new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('userToken')})
    });
  }

  getRoles() {
    var requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.httpclient.get(this.url + '/api/GetRoles', { headers: requestHeader });
  }

  fetchUsers() {
    return this.httpclient.get(this.url + '/api/Profile',
    {
      headers : new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('userToken')})
    });
  }

  fetchManagers() {
    return this.httpclient.get(this.url + '/api/GetManagers',
    {
      headers : new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('userToken')})    
    });
    
  }


  
  //Get the booking users details by id 
  getUser(id : string) {
    return this.httpclient.get(this.url + '/api/Profile/'+id,
    {
      headers : new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('userToken')})
    });
  }

  
   deleteUser(id)
   {

    console.log(id);
    return this.http.delete(this.url + '/api/Profile/'+id).map(res => res.json());
   
   }

 
  
  
  putUser(Id , user : Profile){
    const body: Profile = {
      Id:user.Id,
      UserName: user.UserName,
      Password:user.Password,
      PasswordHash: user.PasswordHash,
      SecurityStamp:user.SecurityStamp,
      Email : user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName 
    }
    return this.httpclient.put(this.url +'/api/Profile/'+ Id, body,
    {
      headers : new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('userToken')})
    });
  }

}


/*
  getAllUser(): Observable<Users[]>{
    var requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.get(this.url + '/api/GetAllUsers', { headers: requestHeader })
      .map((response: Response) => <Users[]>response.json());
  }*/
/*
  getAllUser() {
    var requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.get(this.url + '/api/GetAllUsers', { headers: requestHeader });
  }*/

  


  //Getting all the users
  /*getUserList() {
    this.http.get(this.url + '/api/GetUsers')
      .map((data: Response) => {
        return data.json() as User[];
      }).toPromise().then(x => {
        this.userList = x;
        console.log(x)
      })
  }
  */