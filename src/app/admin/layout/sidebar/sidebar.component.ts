import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthserviceService} from '../../../service/authservice.service';
import {TokenstorageService} from '../../../service/tokenstorage.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  hideMenu :boolean = true;

  constructor(
    private authService: AuthserviceService,
    private router: Router,
    private token: TokenstorageService
  ) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('loggedInUser');
    let usernameInfo = JSON.parse(userData || '{}');
    console.log(usernameInfo.data.email)
    if(usernameInfo.data.email === 'navin.s@paynet.co.in'){
      this.hideMenu = false;
    }
      
  }


  logOut(){
    this.authService.logOutUsers();
    this.router.navigate(['/admin'])

  }
}
