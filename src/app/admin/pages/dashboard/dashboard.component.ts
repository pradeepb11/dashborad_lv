import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/service/authservice.service';
import * as feather from 'feather-icons';
import {ReportService} from '../../../service/report.service';
import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers:[ReportService]
})
export class DashboardComponent implements OnInit {

  // Payout report
  successPayouttxnAmount:any;
  SuccessPayoutTxnCount: any;
  //
  FailurePayoutTxnCount:any;
  FailurePayoutTxnAmount: any;

  // payin report
  SuccessPayinTxnCount:any;
  SuccessPayinTxnAmount:any;
  //
  FailurePayinTxnCount:any;
  FailurePayinTxnAmount: any;

  constructor(
    private authService: AuthserviceService,
    private router: Router,
    private reportService: ReportService
  ) { }

  ngOnInit(): void {
    this.getPAyoutSuccessReport();
    this.getPayoutReportFail();
    //payin
    this.getPayinReportSuccess();
    this.getPayinReportFail();
    //
    registerLocaleData( es );
  }

  logout(){
    this.authService.logOutUsers();
    this.router.navigate(['/admin'])

  }

  getPAyoutSuccessReport(){
    this.reportService.payoutreportsucess()
    .subscribe(
      (res) =>{
        console.log(res.data);
        this.successPayouttxnAmount = res.data[0].SuccessPayoutTxnAmount;
        console.log( this.successPayouttxnAmount)
        this.SuccessPayoutTxnCount =res.data[0].SuccessPayoutTxnCount;
        console.log(this.SuccessPayoutTxnCount)

      }
    )
  }

  getPayoutReportFail(){
    this.reportService.payoutReportFailur()
    .subscribe(
      (res) =>{
        console.log(res);
        this.FailurePayoutTxnCount = res.data[0].FailurePayoutTxnCount;
        this.FailurePayoutTxnAmount = res.data[0].FailurePayoutTxnAmount
      }
    )
  }

  // payin Report
  getPayinReportSuccess(){
    this.reportService.payinReportSuccess()
    .subscribe(
      (res) => {
        console.log(res);
        this.SuccessPayinTxnCount =res.data[0].SuccessPayinTxnCount;
        this.SuccessPayinTxnAmount = res.data[0].SuccessPayinTxnAmount
      }
    )
  }

  getPayinReportFail(){
    this.reportService.payinReportFailure()
    .subscribe(
      (res) =>{
        console.log(res);
        this.FailurePayinTxnCount = res.data[0].FailurePayinTxnCount;
        this.FailurePayinTxnAmount = res.data[0].FailurePayinTxnAmount;
      }
    )
  }


}
