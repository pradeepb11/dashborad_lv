import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Subject} from 'rxjs';

import { DatePipe } from '@angular/common';
declare const $:any ;
import { IDayCalendarConfig, DatePickerComponent } from "ng2-date-picker";
import * as dayjs from 'dayjs';
import {ReportService} from '../../../../service/report.service';
import {BehaviorSubject} from 'rxjs';
import * as Feather from 'feather-icons';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';

@Component({
  selector: 'app-payinreport',
  templateUrl: './payinreport.component.html',
  styleUrls: ['./payinreport.component.scss'],
  providers:[ReportService, DatePipe]
})
export class PayinreportComponent implements OnInit {


  submitted = false;
  filterForm: FormGroup;
  nupaytList:any[];
  paginationList:any[];

  // pipe: DatePipe;
  test:any;
  todayDate:Date;
  isUser:any = false;
  p: number = 1;
  total: number = 0;
  filterTerm: string;
  count: any;
  filterBy:any;
  loading: boolean = false;
  MessageDataInfo: boolean = true;
  MessageDataError: boolean = false;
  searchText: boolean = true;

  dateTo = dayjs();

  // Current page number
  currentPageNumber: number = 1;

  // Total records count
  totalRecordsCount: number = 0;
  // Total pages
  totalPages: number = 0;


  mypagination = false;
  totalCount:any;
  status: any[];
  formula:string = "Payout Report";
  downloadCSVBTN: boolean =false;



  datePickerConfig ={
    format: 'YYYY-MM-DD HH:mm:ss',
    // format:'DD-MM-YYYY '
 
  }

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private reportService: ReportService
  ) { }

  ngAfterViewInit(): void {
    Feather.replace();
  }


  ngOnInit(): void {
    this.setfilterFormValidate();
  }

  setfilterFormValidate(){
    this.filterForm = this.fb.group({
      start_date: new FormControl('', Validators.required),
      end_date: new FormControl('', Validators.required),
    
    })
  }

  get f() { return this.filterForm.controls; }

  get start_date() { return this.filterForm.get('start_date')?.value }
  get end_date() { return this.filterForm.get('end_date')?.value; }

  pageChangeEvent(event: number){
    this.p = event;
    this.applyFilter();
  
}


applyFilter(){
  // console.log(this.fromDate);
  // console.log(this.toDate);
  // console.log(this.filterForm.value)
  // console.log(this.filterForm.value)
  this.loading = true;
  // const {start_date, end_date} = this.filterForm.value;
    // console.log(Date.parse(start_date)/1000);
      // console.log(this.datePipe.transform(this.start_date,"yyyy-MM-dd"));

    let start_date1 = Date.parse(this.datePipe.transform(this.start_date,"yyyy-MM-dd"))/1000;
    let end_date1 = Date.parse(this.datePipe.transform(this.end_date,"yyyy-MM-dd"))/1000;

    console.log(start_date1, end_date1);
    const {start_date1:string, end_date1:any} = this.filterForm.value;
   

this.reportService.payinReport(this.filterForm.value)
.subscribe(
  (res) =>{
   
    console.log(res);
    // console.log(this.filterForm.value);
    if(res.status == 'failure'){
      this.loading = false;
      this.MessageDataError = true;
      this.MessageDataInfo = false;
      this.mypagination = false;
      this.filterForm.reset();
      this.nupaytList = [];
    } else if(res.status == 'success'){
      // console.log('Done messageDataError');
      this.loading = true;
      setTimeout(()=>{
        this.loading = false;
        this.MessageDataInfo = false;
        this.MessageDataError = false;
        this.nupaytList = res.data;
        // console.log(this.nupaytList)
        // this.total = res.response.data.total;
        this.mypagination = true;
        this.downloadCSVBTN = true;
        
      
       
        // this.total = res.response.data.last_page;
      

        // // this.filterForm.reset();
        // if(this.nupaytList.length == 0 && this.nupaytList == []){
        //   this.MessageDataInfo = true; 
        //   this.MessageDataError = true;
        //   this.filterForm.reset();
        //   this.loading = false;
        // }
      },1000)
    }
   

   
   
    
  }
)
this.calculateTotalAmt();
}

calculateTotalAmt(){
  this.reportService.payinReport(this.filterForm.value)
  .subscribe(
    (res) =>{
      // console.log(res.data[0].mySUM)
      var msgTotal = res.data.reduce(function(prev:any, cur:any) {
        return prev + cur.mySUM;
      }, 0);
      console.log('Total :', msgTotal); 
     this.totalCount = msgTotal;
    }
  )
}

downloadCSV(){
  this.status = ["approved", "rejected", "pending"];
  var options = {
    title: 'Payin Report',
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    useBom: true,
    headers: ['merchant_id', 'name', 'Sum', 'Count']
  };
  new AngularCsv(this.nupaytList, this.formula, options)
}

resetDate(){
  this.filterForm.reset();
  this.nupaytList = [];
  this.totalCount ='';
  this.MessageDataInfo = true; 
  this.MessageDataError = false;
  this.mypagination = false;
  // this.getallDataProduct();
}


}
