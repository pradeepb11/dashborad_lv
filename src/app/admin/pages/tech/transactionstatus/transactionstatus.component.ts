import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Subject} from 'rxjs';
import {BehaviorSubject} from 'rxjs';
import * as Feather from 'feather-icons';
import { Router } from '@angular/router';
import {TechpayinstatusupdateService} from '../../../../service/techpayinstatusupdate.service';
@Component({
  selector: 'app-transactionstatus',
  templateUrl: './transactionstatus.component.html',
  styleUrls: ['./transactionstatus.component.scss'],
  providers:[TechpayinstatusupdateService]
})
export class TransactionstatusComponent implements OnInit {
  submitted = false;
  filterFormMerchant: FormGroup;
  merchantProfilelistList:any[];
  paginationList:any[];
  p: number = 1;
  total: number = 0;
  filterTerm!: string;

  loading: boolean = false;
  MessageDataInfo: boolean = true;
  MessageDataError: boolean = false;
  mypagination = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private $service: TechpayinstatusupdateService,
  ) { }


  ngOnInit(): void {
    this.setfilterFormValidate();
   
  }

  setfilterFormValidate(){
    this.filterFormMerchant = this.fb.group({
      transactionid : new FormControl(''),
      transactionrefno: new FormControl(''),
      paypageid: new FormControl(''),
      // [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]
    })
  }

  get f() { return this.filterFormMerchant.controls; }

  pageChangeEvent(event: number){
    this.p = event;
    this.applyFilter();
   
}

  applyFilter(){
    this.loading = true;
    this.$service.getPayinStatusUpdate(this.filterFormMerchant.value)
    .subscribe(
      (res) =>{
        console.log(res)
       if(res.response.status == 'Success' ){
          setTimeout(()=>{
            this.loading = false;
            this.MessageDataInfo = false;
            this.MessageDataError = false;
            this.merchantProfilelistList = res.response.data;
            this.mypagination = true;
            // this.filterFormMerchant.reset();
            // console.log(this.merchantProfilelistList.length);
            if(this.merchantProfilelistList.length == undefined){
              this.MessageDataInfo = true; 
              
              this.loading = false;
            }
          },500)
        }else if(res.response.status == 'failure'){
          this.loading = false;
          this.MessageDataError = true;
          this.MessageDataInfo = false;
          this.merchantProfilelistList =[];
          this.filterFormMerchant.reset();
        }
       
         
        }
      
        
      
      
    )  
  }

  resetDate(){
    this.filterFormMerchant.reset();
    this.merchantProfilelistList = [];
    this.MessageDataInfo = true; 
    this.MessageDataError = false;
    this.mypagination = false;
  }




}
