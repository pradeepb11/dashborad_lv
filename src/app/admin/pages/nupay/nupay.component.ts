import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, Input, EventEmitter  } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Subject} from 'rxjs';

import { DatePipe } from '@angular/common';
declare const $:any ;
import { IDayCalendarConfig, DatePickerComponent } from "ng2-date-picker";
import * as dayjs from 'dayjs';
import {NupayService} from '../../../service/nupay.service';
import {BehaviorSubject} from 'rxjs';
import * as Feather from 'feather-icons';



interface State {
  page: number;
  pageOffset: number;
}


@Component({
  selector: 'app-nupay',
  templateUrl: './nupay.component.html',
  styleUrls: ['./nupay.component.scss'],
  providers:[NupayService, DatePipe]
})
export class NupayComponent implements OnInit, AfterViewInit {
  
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

  loading: boolean = false;
  MessageDataInfo: boolean = true;
  MessageDataError: boolean = false;

  dateTo = dayjs();

  // Current page number
  currentPageNumber: number = 1;

  // Total records count
  totalRecordsCount: number = 0;
  // Total pages
  totalPages: number = 0;
  // Pager
  @Input() reload: EventEmitter<boolean> | undefined;
  links:any;

  paginate = new BehaviorSubject<State>({
    page: 1,
    pageOffset: 10
  });

  mypagination = false;




  datePickerConfig ={
    // format: 'YYYY-MM-DD',
    format:'DD-MM-YYYY'
 
  }


  constructor(
    private nupayService: NupayService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) { }

  
  ngAfterViewInit(): void {
    Feather.replace();
  }

  ngOnInit(): void {
    this.setfilterFormValidate();
  }

  setfilterFormValidate(){
    this.filterForm = this.fb.group({
      merchant_id: new FormControl('', Validators.required),
      start_date: new FormControl('', Validators.required),
      end_date: new FormControl('', Validators.required),
      log_type: new FormControl(''),
      log_name: new FormControl(''),
      txnRefNo: new FormControl('')
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
  this.nupayService.nypaydatadaterangefilter(this.filterForm.value)
  .subscribe(
    (res) =>{
      console.log(res.response.data)
      this.loading = true;
      setTimeout(()=>{
        this.loading = false;
        this.MessageDataInfo = false;
        this.MessageDataError = true;
        this.filterForm.reset();
        this.nupaytList = res.response.data.data;
        // console.log(this.nupaytList)
        // this.total = res.response.data.total;
        this.nupaytList = res.response.data.data;
        this.mypagination = true;
        
      
       
        this.total = res.response.data.last_page;
      

        // this.filterForm.reset();
        if(this.nupaytList.length == 0){
          this.MessageDataInfo = true; 
          this.filterForm.reset();
          this.loading = false;
        }
      },1000)
      // let start_Date = this.datePipe.transform(this.start_date, 'YYYY-MM-d');
      // let end_Date = this.datePipe.transform(this.end_date, 'YYYY-MM-d');
      // let start_Date = this.datePipe.transform(this.start_date, 'dd-MM-YYYY');
      // let end_Date = this.datePipe.transform(this.end_date, 'dd-MM-YYYY');
      
    }
  )
    
  }

  resetDate(){
    this.filterForm.reset();
    this.nupaytList = [];
    this.MessageDataInfo = true; 
    this.mypagination = false;
    // this.getallDataProduct();
  }

}
