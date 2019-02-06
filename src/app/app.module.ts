// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http'


// Components
import { AppComponent } from './app.component';
import { HotelsComponent } from './hotels/hotels.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { StartOfferComponent } from './start-offer/start-offer.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { HotelDashboardComponent } from './hotel-dashboard/hotel-dashboard.component';
import { NotFoundComponent } from './helpers/not-found.component';
import { AccessDirectiveDirective } from './helpers/access-directive.directive';
import { DashboardComponent } from './dashboard/dashboard.component';

// Services
import { ServicesService } from './shared/services.service';
import { AuthGuardGuard } from './shared/auth-guard.guard';
import { PreviewbidComponent } from './previewbid/previewbid.component';
import { PaymentsComponent } from './payments/payments.component';
import { BidresultsComponent } from './bidresults/bidresults.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HotelsComponent,
    NavbarComponent,
    HomeComponent,
    StartOfferComponent,
    ProfileComponent,
    RegisterComponent,
    AccessDirectiveDirective,
    HotelDashboardComponent,
    NotFoundComponent,
    PreviewbidComponent,
    PaymentsComponent,
    BidresultsComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { 
        path: '', 
        pathMatch: 'full', 
        redirectTo: '/home'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'hotel-dashboard',
        component: HotelDashboardComponent
      },
      {
        path: 'startOffer',
        component: StartOfferComponent
      },
      {
        path: 'user_registration',
        component: RegisterComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuardGuard],
        data: {roles : ['Admin']} //I
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuardGuard],
        data: {roles : ['Customer']} //I
      },
      {
        path: 'hotels',
        component: HotelsComponent
      },
      { path: 'previewoffer', 
        component: PreviewbidComponent
      },
      { path: 'previewoffer', 
        component: PreviewbidComponent
      },
      { path: 'payment', 
        component: PaymentsComponent,
      },
      { path: 'bidresults', 
        component: BidresultsComponent,
      },
      { path: '**', 
        component: NotFoundComponent
      }
   ])
  ],
  providers: [ServicesService, AuthGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
