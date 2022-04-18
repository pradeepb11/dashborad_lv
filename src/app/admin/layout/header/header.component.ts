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
    const slides = document.getElementsByClassName('js-simplebar');
    if (slides[0]) {
      var e = (slides[0]);
      document.querySelectorAll(".js-sidebar [data-bs-parent]").forEach((function(t) {
      //  console.log(e.parentNode);
       let b =  e.parentElement !;
       b.classList.toggle('collapsed');
      }))
    }
  }

  logout(){
    this.token.signOut();
    this.router.navigate(['/admin'])
  }

}
