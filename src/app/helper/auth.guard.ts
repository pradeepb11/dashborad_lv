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

    private authService: AuthserviceService
  ){
    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean | Observable<boolean> | Promise<boolean> {

      // if(!this.authService.LoginStatus){
      //  console.log(this.authService.LoginStatus);

      // }
      // return this.authService.LoginStatus;
     
      const currentUser = this.authService.loggedInUserValue;
      // console.log(currentUser);
      if(currentUser){
        return true;
        
      }
    this.router.navigate(['/login'])  
    return false;
      
   
     
  }

  
}
