import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-otpverification',
  templateUrl: './otpverification.component.html',
  styleUrls: ['./otpverification.component.scss']
})
export class OtpverificationComponent implements OnInit {
  forgotpasswordForm:FormGroup;
  submitted = false;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.setLoginValidation();
  }

    // validation form
    setLoginValidation() {
      this.forgotpasswordForm = this.fb.group({
        email: new FormControl('',  [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]),
      
      })
    }

  get f() { return this.forgotpasswordForm.controls; }

  forgotpasswordSubmit(){

  }  

}
