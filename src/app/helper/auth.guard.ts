import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthserviceService} from '../service/authservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthserviceService
) {}


canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot){
    const currentUser = this.authenticationService.loggedInUserValue;
    if(currentUser){
      return true;
      console.log(currentUser)
    }
  this.router.navigate(['/admin'])  
  return false;
  
}
  
}
