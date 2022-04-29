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
  selector: 'app-nupaytransaction',
  templateUrl: './nupaytransaction.component.html',
  styleUrls: ['./nupaytransaction.component.scss'],
  providers:[NupayService, DatePipe]
})
export class NupaytransactionComponent implements OnInit {

  submitted = false;
  filterForm: FormGroup;
  nupayttransactionList:any[];
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
  paginate = new BehaviorSubject<State>({
    page: 1,
    pageOffset: 10
  });

  mypagination = false;

  constructor(
    private nupayService: NupayService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) { }

  ngAfterViewInit(): void {
    Feather.replace();
  }

  ngOnInit(): void {
    this.retivenupatransactionlog();
  }

  pageChangeEvent(event: number){
    this.p = event;
    // this.applyFilter();
  
}

retivenupatransactionlog(){
  this.nupayService.nupayTransactionLogRetrive()
  .subscribe(
    (res) =>{
      console.log(res);
      if(res.response.status == 'failure'){
        this.loading = false;
        this.MessageDataError = true;
        this.MessageDataInfo = false;
        this.mypagination = false;
        this.filterForm.reset();
        this.nupayttransactionList = [];
      } else if(res.response.status == 'Success'){
        console.log('Done messageDataError');
        this.loading = true;
        setTimeout(()=>{
          this.loading = false;
          this.MessageDataInfo = false;
          this.MessageDataError = false;
          this.nupayttransactionList = res.response.data.data;
          console.log(this.nupayttransactionList);
          this.mypagination = true;
          this.total = res.response.data.last_page;
        
        },1000)
      }
    }
  )
}

}
