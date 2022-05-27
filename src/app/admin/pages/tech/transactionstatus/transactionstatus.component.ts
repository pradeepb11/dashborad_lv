import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Subject} from 'rxjs';
import {BehaviorSubject} from 'rxjs';
import * as Feather from 'feather-icons';
import { Router } from '@angular/router';
import {TechpayinstatusupdateService} from '../../../../service/techpayinstatusupdate.service';
import { NotificationService } from 'src/app/service/notification.service';
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
  testingABC:any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private $service: TechpayinstatusupdateService,
    private notification: NotificationService
  ) { }


  ngOnInit(): void {
    this.setfilterFormValidate();
   
  }

  setfilterFormValidate(){
    this.filterFormMerchant = this.fb.group({
      txn_id : new FormControl(''),
      ref_no: new FormControl(''),
      paypage_id: new FormControl(''),
      // [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]
    })
  }

  get f() { return this.filterFormMerchant.controls; }

  pageChangeEvent(event: number){
    this.p = event;
    this.applyFilter();
   
}

  applyFilter(){
    
    if(this.filterFormMerchant.get('txn_id').value === '' && this.filterFormMerchant.get('ref_no').value === '' && this.filterFormMerchant.get('paypage_id').value === '') {
      this.notification.showError('', 'At least one of the  input fields is required');
      return {required: 'at least one of the items is required'}
     
      // return false;
      
    } else {
      console.log('bye')
      // return true;
      
    

    this.loading = true;
    this.$service.getPayinStatusUpdate(this.filterFormMerchant.value)
    .subscribe(
      (res) =>{
        console.log(res)
       if(res.Status == 'Success' ){
          setTimeout(()=>{
            this.loading = false;
            this.MessageDataInfo = false;
            this.MessageDataError = false;
            this.merchantProfilelistList = res.data;
            this.mypagination = true;
            // this.filterFormMerchant.reset();
            // console.log(this.merchantProfilelistList.length);
            if(this.merchantProfilelistList.length == undefined){
              this.MessageDataInfo = true; 
              
              this.loading = false;
            }
          },500)
        }else if(res.Status == 'failure'){
          this.loading = false;
          this.MessageDataError = true;
          this.MessageDataInfo = false;
          this.merchantProfilelistList =[];
          this.filterFormMerchant.reset();
        }
       
         
        }
      
        
      
      
    )  
    return null;
      }
  }

  resetDate(){
    this.filterFormMerchant.reset();
    this.merchantProfilelistList = [];
    this.MessageDataInfo = true; 
    this.MessageDataError = false;
    this.mypagination = false;
    
  }


  onChange($event:any, items:any) {
    console.log($event.target.value)
    console.log(items.Transaction_id);
    console.log(items.Transaction_Status);
    
    this.$service.getPayinStatusEdit(items.Transaction_id,items.Transaction_Status)
    .subscribe(
      (res) =>{
        console.log(res);
      }
    )
    
    // let person = this.peopleForm.get("person").value
    // console.log("selected person--->", person);
    // // this.peopleForm.get("person").setValue(person.id);
  }



}
