import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Users } from '../shared/users.interface';
import { ServicesService } from '../shared/services.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 
  users : any;
  managers : any;

  constructor(private userService: UserService, private serviceService : ServicesService ,private toastr : ToastrService) { }

  ngOnInit() {

    this.userService.fetchUsers().subscribe((data : any) => {
      this.users =data;
      console.log(data);
    })

    this.userService.fetchManagers().subscribe((data : any) => {
      this.managers =data;
      console.log(data);
     //
    })

    

  }


      deleteUser(id)
      {
        console.log(id);
        if(confirm('Are you sure you want to delete this user?') == true)
        {
        this.userService.deleteUser(id)
        .subscribe(x => {
          this.toastr.warning("Deleted Successfully","Delete");
          window.location.reload();
        })
      }
     }
        
  
}
