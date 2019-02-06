import { Directive } from "@angular/core";

//Components
import { DashboardComponent } from '../dashboard/dashboard.component';
import { StartOfferComponent } from '../start-offer/start-offer.component';
import { HotelDashboardComponent } from '../hotel-dashboard/hotel-dashboard.component';

@Directive({
  selector: '[home]'
})

export class AccessDirectiveDirective {

  authNavigation(role){
    if (role == "Admin") {
        return DashboardComponent;
    } else if (role == "Hotel_Manager") {
        return HotelDashboardComponent;
    } else if (role == "Customer") {
        return StartOfferComponent;
    }
  }

}
