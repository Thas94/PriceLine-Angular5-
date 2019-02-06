import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicesService } from './services.service';

@Injectable()
export class AuthGuardGuard implements CanActivate {

  constructor(private service: ServicesService,
              private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      //return this.service.getUserLoggedIn();
      if (localStorage.getItem('userToken') != null) {
        let roles = next.data["roles"] as Array<string>
      
        if (roles) {
          var match = this.service.roleMatch(roles);

         

          if (match) {
            return true;
          } else {
            this.router.navigate(['/forbidden']);
            return false;
          }
        }
        else
          return true;
      }
      this.router.navigate(['/home']);
      return false;
  }
}