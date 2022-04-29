import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Subject} from 'rxjs';

import { DatePipe } from '@angular/common';
declare const $:any ;
import { IDayCalendarConfig, DatePickerComponent } from "ng2-date-picker";
import * as dayjs from 'dayjs';
import {ReportService} from '../../../service/report.service';
import {BehaviorSubject} from 'rxjs';
import * as Feather from 'feather-icons';

@Component({
  selector: 'app-amtreport',
  templateUrl: './amtreport.component.html',
  styleUrls: ['./amtreport.component.scss'],
  providers:[ReportService, DatePipe]
})
export class AmtreportComponent implements OnInit {

  amtReportList: any;

  constructor(
    private reportService:ReportService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.retriveAllAmtReport();
  }

  retriveAllAmtReport(){
    this.reportService.dateWiseAmtReport()
    .subscribe(
      (res) => {
        console.log(res.data);
        this.amtReportList = res.data;
      }
    )
  }

}
