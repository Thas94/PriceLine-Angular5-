import { Component, OnInit } from '@angular/core';
import {Room} from '../shared/room.model'
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServicesService } from '../shared/services.service';
import { Hotel } from '../shared/hotel.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {

  hotel : Room = new Room();
  address : Hotel = new Hotel();
  show : boolean = false;
  hotelID : any;
  hotelDetails : Room;
  hotelModul : Room;
  manager_id : any;

  constructor(private service  : ServicesService, private toastr : ToastrService,private _router : Router) { }

  ngOnInit() {
    this.resetForm();
    this.manager_id = localStorage.getItem("manager_id");
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
        this.address = {
          hotel_id: null,
          Country: '',
          Province: '',
          City: '',
          zip_code: null,
          street_Address: '',
          website: '',
          rating: null,
          phone_no: null,
          hotelMan_id : null,
          Hotel_Name : ''
        }
    }

    addHotel(form:NgForm) {
        this.service.addHotel(form.value)
        .subscribe((data: any) => {
          console.log(data)
          if (data.Succeeded == true) {
            this.toastr.error('Failed to add property address');
          }
          else {
            this.resetForm(form);
            this.toastr.success('Hotel address added');
            this._router.navigate(['/home']);
          }
        });
      }

      addRoom(form:NgForm) {
          this.service.addRooms(form.value)
          .subscribe((data: any) => {
            console.log(data)
            if (data.Succeeded == true) {
              this.toastr.error('Failed to add property address');
            }
            else {
              this.resetForm(form);
              this.toastr.success('Property address added');
            }
          });
        }

}