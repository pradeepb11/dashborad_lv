import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthserviceService } from 'src/app/service/authservice.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[AuthserviceService]
})
export class LoginComponent implements OnInit {
  // passowrdhide/show
  show_button: Boolean = false;
  show_eye: Boolean = false;

  // login form 
  loginForm: FormGroup;

  // form submit
  submitted = false;
  isLoggedIn = false;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthserviceService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {

    this.setLoginValidation();
  }

  get f() { return this.loginForm.controls; }

   // validation form
   setLoginValidation() {
    this.loginForm = this.fb.group({
      // email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
  }

  showPassword() {
    this.show_button = !this.show_button;
    this.show_eye = !this.show_eye;
  }

  onLoginSubmit(){
    // console.log(this.loginForm.value);
    const {username, password} = this.loginForm.value;
    // console.log(username, password)
    this.authService.loginUser(username, password)
    .subscribe(
      (res) =>{
        console.log(res);
        

        if(res.response.status === 'error'){
          this.notification.showError('', 'Username & Password Do not Match');
          this.loginForm.reset();
        }else if (res.response.status === 'success') {
          this.notification.showSuccess('', 'Sucessfully Login');
          this.router.navigate(['/dashboard'], {relativeTo: this.route})
        } 
      
      }
    )




    // this.router.navigate(['/dashboard'], { relativeTo: this.route })
  }


}
