import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/service/authservice.service';
import * as feather from 'feather-icons';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private authService: AuthserviceService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logOutUsers();
    this.router.navigate(['/admin'])

  }

}
