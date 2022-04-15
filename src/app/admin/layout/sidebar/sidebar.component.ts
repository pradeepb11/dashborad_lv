import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthserviceService} from '../../../service/authservice.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    private authService: AuthserviceService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  logOut(){
    this.authService.logOutUsers();
    this.router.navigate(['/admin'])

  }
}
