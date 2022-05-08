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




  datePickerConfig ={
    format: 'YYYY-MM-DD hh:mm:ss',
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
    let start_date1 = Date.parse(this.start_date)/1000;
    let end_date1 = Date.parse(this.end_date)/1000;

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
  
}

resetDate(){
  this.filterForm.reset();
  this.nupaytList = [];
  this.MessageDataInfo = true; 
  this.MessageDataError = false;
  this.mypagination = false;
  // this.getallDataProduct();
}

}
