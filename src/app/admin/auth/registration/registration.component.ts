import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from 'src/app/service/registration.service';
import { ConfirmedValidator } from '../../../helper/validation';
import { NotificationService } from 'src/app/service/notification.service';
import { FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  basicInfoRegForm: FormGroup;
  submitted = false;
  show_button: Boolean = false;
  show_button_confirm: Boolean = false;
  show_eye: Boolean = false;
  show_eye_confirm: Boolean = false;

  public hearList= [
    {name: 'Facebook'},
    {name:'Twitter'},
    {name:'LinkedIn'},
    {name:'Google Ads'},
    {name:'Search Engine'},
    {name:'Blog post'},
    {name:'Friend'},
    {name:'Other Medium'},
    {name:'Direct Calling'}
  ]

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private registerService: RegistrationService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.setBasicInfoValidator();
  }

   setBasicInfoValidator() {
    this.basicInfoRegForm = this.formBuilder.group({
      first_name: new FormControl('', [Validators.required, Validators.pattern('/^[a-zA-Z0-9!@#$%^&*()]+$/')]),
      last_name: new FormControl('', [Validators.required, Validators.pattern('/^[a-zA-Z0-9!@#$%^&*()]+$/')]),
      mobile: new FormControl('', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]),
      password: new FormControl('', Validators.required),


      // username: new FormControl('', Validators.required),
      confirm_password: new FormControl('', Validators.required)
    },
      {
        validator: ConfirmedValidator('password', 'confirm_password')
      }
    )
  }

  get f() { return this.basicInfoRegForm.controls; }

  onbasicInfoRegistrationForm(){

  this.submitted = true;
  this.registerService.createRegistration(this.basicInfoRegForm.value)
  .subscribe(
    (res) =>{
      // console.log(res.detail);
      
      let validationMeg = res.detail;
     
      // console.log(validationMeg);
      if(res.status === 'error'){
        
        this.notification.showError('', `${validationMeg}`);
        this.basicInfoRegForm.reset();
      }else if(res.status === 'validation error'){
        let validationEmailErr = res.detail.email;
        let validationmobErr = res.detail.mobile;
        if(validationEmailErr){
          this.notification.showError('', `${validationEmailErr} `);
        }else{
          this.notification.showError('', `${validationmobErr}  `);
        }
       
       
      
        // 
      }else if (res.status === 'success') {
        this.notification.showSuccess('', 'Sucessfully Login');
        this.router.navigate(['/admin'], {relativeTo: this.route})
      } 

      // this.notification.showSuccess('', 'Sucessfully Inserted');
      // this.basicInfoRegForm.reset();
      // this.router.navigate(['./admin'])
    }
  )  
    


  }
  showPassword() {
    this.show_button = !this.show_button;
    this.show_eye = !this.show_eye;
  }
  showPasswordConfirm(){
    this.show_button_confirm = !this.show_button_confirm;
    this.show_eye_confirm = !this.show_eye_confirm;
  }


}
