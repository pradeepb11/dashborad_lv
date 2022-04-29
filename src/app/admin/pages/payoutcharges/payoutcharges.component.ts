import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Subject} from 'rxjs';
import {PayoutchargesService} from '../../../service/payoutcharges.service';
import { DatePipe } from '@angular/common';
declare const $:any ;
import { IDayCalendarConfig, DatePickerComponent } from "ng2-date-picker";
import * as dayjs from 'dayjs';

import {BehaviorSubject} from 'rxjs';
import * as Feather from 'feather-icons';

interface State {
  page: number;
  pageOffset: number;
}


@Component({
  selector: 'app-payoutcharges',
  templateUrl: './payoutcharges.component.html',
  styleUrls: ['./payoutcharges.component.scss'],
  providers:[DatePipe, PayoutchargesService]
})
export class PayoutchargesComponent implements OnInit {
  submitted = false;
  p: number = 1;
  total: number = 0;

  loading: boolean = false;
  MessageDataInfo: boolean = true;
  MessageDataError: boolean = false;
  mypagination = false;
  filterTerm: string;
  payoutChargesList: any
  filterFormpayoutcharges: FormGroup;



  datePickerConfig ={
    // format: 'YYYY-MM-DD',
    format:'DD-MM-YYYY'
 
  }

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private payoutchgService: PayoutchargesService
  ) { }

  ngOnInit(): void {
    this.setfilterFormValidate();
  }


  setfilterFormValidate(){
    this.filterFormpayoutcharges = this.fb.group({
      merchant_id: new FormControl(''),
      date: new FormControl('', Validators.required),
     
    })
  }

  get f() { return this.filterFormpayoutcharges.controls; }


  pageChangeEvent(event: number){
    this.p = event;
    // this.applyFilter();
  
}

applyFilter(){
  // this.loading = true;
  this.payoutchgService.filterDailypayoutCharges(this.filterFormpayoutcharges.value)
  .subscribe(
    (res) =>{
      // console.log(res);
      // this.payoutChargesList = res.response.data;
      if(res.response.status == 'failure'){
        this.loading = false;
        this.MessageDataError = true;
        this.MessageDataInfo = false;
        this.mypagination = false;
        this.filterFormpayoutcharges.reset();
        this.payoutChargesList = [];
      } else if(res.response.status == 'Success'){
        this.loading = true;
        setTimeout(()=>{
          this.loading = false;
          this.MessageDataInfo = false;
          this.MessageDataError = false;
          this.payoutChargesList = res.response.data;
          this.mypagination = true;
          this.total = res.response.data.last_page;
        
        },1000)
      }
    }
  )

}

resetDate(){
  this.filterFormpayoutcharges.reset();
  this.payoutChargesList = [];
  this.MessageDataInfo = true; 
  this.MessageDataError = false;
  this.mypagination = false;
}

}
