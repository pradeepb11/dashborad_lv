import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { TokenstorageService } from 'src/app/service/tokenstorage.service'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers:[TokenstorageService]
})
export class HeaderComponent implements OnInit {
  username: any;
  roles: any;
  userEmail: any;

  constructor(
    private token: TokenstorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const userData = this.token.getToken();
    // console.log(userData);
    let usernameInfo = JSON.parse(userData || '{}');
    let usernameA = usernameInfo.data.name;
    this.username = usernameA;
    let useremail = usernameInfo.data.email;
    this.userEmail = useremail
  }

  sidebarToggle(){

  }

  logout(){
    this.token.signOut();
    this.router.navigate(['/admin'])
  }

}
