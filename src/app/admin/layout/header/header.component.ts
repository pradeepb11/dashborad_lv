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
    console.log(slides);
    if (slides[0]) {
      var e = (slides[0]);

      // let abc = document.querySelectorAll('.js-sidebar [dadta-bs-parent]');
      // console.log(abc)
        let a = document.querySelector('.js-simplebar');
        console.log(a.parentElement.classList.toggle('collapsed'))
        // a.parentElement.classList.toggle('collapsed')

     
     
      // document.querySelectorAll(".js-sidebar [data-bs-parent]").forEach((function(t) {
       
      //  let b =  e.parentElement!;
      //  console.log(b) 
      //  b.classList.toggle('collapsed');
      
      // }))
    }
  }

  logout(){
    this.token.signOut();
    this.router.navigate(['/dashboard-ui/#/admin']);
    location.href='/dashboard-ui/#/admin';
  }

}
