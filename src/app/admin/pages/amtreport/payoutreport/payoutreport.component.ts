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
import * as moment from 'moment';


@Component({
  selector: 'app-payoutreport',
  templateUrl: './payoutreport.component.html',
  styleUrls: ['./payoutreport.component.scss'],
  providers:[ReportService, DatePipe]
})
export class PayoutreportComponent implements OnInit, AfterViewInit {

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
    // format:'DD-MM-YYYY'
    
   
 
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

  const date = moment();

  //testing Work date

 
  }

  setfilterFormValidate(){
    this.filterForm = this.fb.group({
      // moment(new Date()).format('DD-MM-YYYY')
      start_date: new FormControl(moment().startOf('day').format('YYYY-MM-DD HH:ss:mm') , Validators.required),
      end_date: new FormControl(moment().endOf('day').format('YYYY-MM-DD HH:ss:mm'), Validators.required),
    
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
  

  this.loading = true;
  
//  console.log(this.filterForm.value);
//  const {start_date, end_date} = this.filterForm.value;
//  console.log(start_date, end_date)
//  console.log(moment(start_date).format())



  var start = moment().startOf('day'); // set to 12:00 am today
    // console.log(start)
    var end = moment().endOf('day'); // set to 23:59 pm today


   
    let start_date1 = Date.parse(this.datePipe.transform(this.start_date,"yyyy-MM-dd HH:mm:ss"))/1000;
    let end_date1 = Date.parse(this.datePipe.transform(this.end_date,"yyyy-MM-dd HH:mm:ss"))/1000;

    console.log(start_date1, end_date1);
    const {start_date1:string, end_date1:any} = this.filterForm.value;
   

this.reportService.payoutReport(this.filterForm.value)
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
  this.reportService.payoutReport(this.filterForm.value)
  .subscribe(
    (res) =>{
     
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
    title: 'Payout Report',
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
