import { Component, OnInit } from '@angular/core';
import {ServicesService} from 'src/app/shared/services.service';
import {BankDetails} from '../shared/bank-details.model'
import {Profile} from '../shared/profile.model'
import {UserService} from 'src/app/shared/user.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userClaims : any
  bankD : BankDetails;
  prof : Profile;
  bids : any
  bankDetails : any;
  isAvail : boolean = false;

  constructor(private userService  : UserService, private bankService  : ServicesService, private toastr : ToastrService,
     private toaster : ToastrService,private service : ServicesService,private _router : Router) { }

  ngOnInit() {
    this.userService.getUserClaims().subscribe((data :any ) => {
      this.userClaims = data;
      this.resetForm();
      this.updateResetForm();
      localStorage.setItem('id',this.userClaims.Id);
      console.log("GGFG",this.userClaims.Id)

      this.service.getBidDetailsID(this.userClaims.Id)
    .subscribe((data :any ) => {
      this.bids = data;

      this.service.getBankDetailsID(this.userClaims.Id).subscribe((data : any)=>{
        this.bankDetails = data;
        console.log("vvvv",this.bankDetails)

        if(this.bankDetails.length <= 0)
        {
          //post
          this.isAvail = false;
        }
        else
        {
          //update
          this.isAvail = true;
        }

      })
    });
    });
   
  }
  Updatebank(form : NgForm)
  {
    console.log("dfb",this.bankDetails[0].bank_id)
    this.service.UpdateBankDetails(this.bankDetails[0].bank_id,form.value)
    .subscribe((data : any ) => {
      
        this.updateResetForm(form);
        this.toaster.info('Update Successful',' Update ');
        window.location.reload();
    });
  }

   updateResetForm(form?: NgForm) {
      if (form != null)
        form.reset();
          this.prof = {
            Id: '',
            UserName: '',
            Password:'',
            PasswordHash: '',
            SecurityStamp:'',
            Email : '',
            FirstName: '',
            LastName: ''
          }
       } 


    Update(form: NgForm) 
    {
       this.userService.putUser(form.value.Id,form.value)
          .subscribe((data : any ) => {
            
              this.updateResetForm(form);
              this.toaster.info('Update Successful',' Update ');

          });
    }

    resetForm(form?: NgForm) {
      if (form != null)
        form.reset();
          this.bankD = {
            user_id: null,
            acc_no: null,
            acc_holder: '',
            acc_Type: '',
            card_no: null,
            branch_no: null,
            exp_Date: '',
            cvv:null,
            bank_Name:''
          }
  } 
 
  registerBankDetails(form:NgForm) {
    
    this.bankService.registerBankDetails(form.value)
    .subscribe((data: any) => {
      if (data.Succeeded == true) {
        this.toastr.error('Failed to add bank details');
      }
      else {
        this.resetForm(form);
        this.toastr.success('Bank details added to account');     
        this._router.navigate(['/profile']);
      }
    }); 
  }
}

