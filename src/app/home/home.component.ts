import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../shared/services.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user1 : User = {
    Email : '',
    LastName : '',
    FirstName : '',
    Password : '',
    UserName: ''
  }

  constructor(private _router : Router,
              private service : ServicesService,
              private toastr : ToastrService,
              private userService  : UserService) { }

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


  needed(){
    console.log("nedded")
  }

  ngOnInit() {
    this.resetForm();
    this.yes = "out";
    this.service.getAllRoles().subscribe(
      (data : any) => {
        data.forEach(obj => obj.selected = false);
             
           this.roles= data;

           for(var i = 0 ;this.roles.length;i++)
           {
            // console.log(this.roles[i]["Name"]);
             if(this.roles[i]["Name"] == "Admin")
             {
               this.roles.splice(i,1);
             }
           }                             
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

  customerSignup(registerForm: NgForm) {
     
     this.x = this.roles.filter(x => x.selected).map(y => y.Name)
     alert(this.x);
      this.service.registerUser(registerForm.value, this.x)
        .subscribe((data: any) => {

          this.managerID = data;

          if (data.Succeeded == true) {
            
           
            this.toastr.error('User registration failed')
            
          } else 
          {
            this.toastr.success('User registration successful');
            this.resetForm(registerForm);
            window.location.reload();
           
   

              if( this.x == this.manager)
              {
             
                this._router.navigate(['/hotels']);
                localStorage.setItem("manager_id", this.managerID);
              }
              else
              {
                this._router.navigate(['/home']);
              }   
              window.location.reload(); 
             
            
          }
        }); 
  }

  updateSelectedRoles(index) {
    this.roles[index].selected = !this.roles[index].selected;
   
  }



  submitBid(bidForm: NgForm): void {
    var destination = bidForm.value.destination;
    var startDate = bidForm.value.startDate;
    var endDate  = bidForm.value.endDate;
    var roomCount = bidForm.value.roomCount;

    var details = {destination, startDate, endDate, roomCount}

    localStorage.setItem("details", JSON.stringify(details));

    var split = startDate.split('-');
    var split2 = endDate.split('-');
    this.numNights = parseInt(split2[2]) - parseInt(split[2]);
    localStorage.setItem("numDays",this.numNights);


      //Search destination
      this.service.SearchHotelsDestination(destination).subscribe((data: any) => {

        if(data.length == 0)
        {
          this.toastr.error('No results found for your destination')
        }
        else
        {
          this.hotelResults = data;
          localStorage.setItem("hotelResults", JSON.stringify(this.hotelResults));
          console.log("Filtered Province",this.hotelResults)   
          this._router.navigate(['/startOffer']);
          window.location.reload();
        }
      });
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
  
         
        if(data.role == '["Hotel_Manager"]')
        {
         // console.log(data.role);
          this._router.navigate(['/hotel-dashboard']);
        }
      
        if(data.role == '["Customer"]')
        {
        //  console.log(data.role);
          this._router.navigate(['/home']);
        }
      

        if(data.role == '["Admin"]')
        {
        //  console.log(data.role);
          this._router.navigate(['/dashboard']); 

        }
    
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

}
