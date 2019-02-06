import { Component, OnInit } from '@angular/core';
import {Room} from '../shared/room.model'
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServicesService } from '../shared/services.service';
import { Hotel } from '../shared/hotel.model';
import {UserService} from '../shared/user.service';
@Component({
  selector: 'app-hotel-dashboard',
  templateUrl: './hotel-dashboard.component.html',
  styleUrls: ['./hotel-dashboard.component.css']
})
export class HotelDashboardComponent implements OnInit {

  hotel : Room = new Room();
  address : Hotel = new Hotel();
  show : boolean = false;
  hotelID : any;
  roomDetails : Room;
  roomModul : Room;
  userClaims : any;
  managerId : any;

  constructor(private service  : ServicesService, private userService : UserService, private toastr : ToastrService) { }

  ngOnInit() {

    this.resetForm();
   //get manager id using claims 
    this.userService.getUserClaims().subscribe((data :any ) => {
      this.userClaims = data;
      this.managerId = data.Id;
     
     //A list of all rooms added by the currently logged in admin 
      this.service.getRoomDetails(this.managerId).subscribe((data : any ) =>{
        this.roomDetails = data;  
      })

    });
   
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
        this.hotel = {
          room_Type: '',
          numRooms: null,
          contact_Person: '',
          room_Price: '',
          hotelMan_id : '',
          endDate:'',
          startDate:''
        }
    }

    addRoom(form:NgForm) {
     
        this.service.addRooms(form.value)
        .subscribe((data: any) => {
          console.log(data)
          if (data.Succeeded == true) {
            this.toastr.error('Failed to add room details');
          }
          else {
            this.resetForm(form);
            this.toastr.success('room details added');
            window.location.reload();
          }
        });
      }

      fillModal(room)
      {
       
        this.roomModul = room;
      
      }


      //Update hotel details  
      updateHoteldeatils(form : NgForm )
      {
        console.log(form.value)
          this.service.putHotel(form.value.room_id, form.value)
          .subscribe((data : any ) => {

            this.toastr.info('Update Successful',' Update'); 
            window.location.reload();
          })
      }

     

}
