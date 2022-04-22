import { Component, OnInit } from '@angular/core';
import {EmailverificationotpService} from '../../../service/emailverificationotp.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Subject} from 'rxjs';
import {BehaviorSubject} from 'rxjs';
import * as Feather from 'feather-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emailverificationotp',
  templateUrl: './emailverificationotp.component.html',
  styleUrls: ['./emailverificationotp.component.scss'],
  providers:[EmailverificationotpService]
})
export class EmailverificationotpComponent implements OnInit {
  submitted = false;
  filterFormEmailverification: FormGroup;
  emailverifylistList:any[];
  paginationList:any[];
  p: number = 1;
  total: number = 0;
  filterTerm: string;

  loading: boolean = false;
  MessageDataInfo: boolean = true;
  MessageDataError: boolean = false;
  mypagination = false;


  constructor(
    private emailverifyService: EmailverificationotpService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setfilterFormValidate();
  }

  setfilterFormValidate(){
    this.filterFormEmailverification = this.fb.group({
      email_id: new FormControl('', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]),
      // [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]
    })
  }

  get f() { return this.filterFormEmailverification.controls; }

  pageChangeEvent(event: number){
    this.p = event;
    this.applyFilter();
   
}

applyFilter(){
  this.loading = true;
  this.emailverifyService.merchantDataFilter(this.filterFormEmailverification.value)
  .subscribe(
    (res) =>{
      console.log(res.response.status);
      if(res.response.status === 'failure'){
        this.loading = false;
        this.MessageDataInfo = false;
        this.MessageDataError = true;
      }else{
        this.loading = false;
        this.MessageDataInfo = false;
        this.emailverifylistList = res.response.data;
        this.mypagination = true;
        this.filterFormEmailverification.reset();
      }

      
      
    }
  )
}

resetDate(){
  this.filterFormEmailverification.reset();
  this.emailverifylistList = [];
  this.MessageDataInfo = true; 
  this.mypagination = false;
}

}
