import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/service/authservice.service';
import * as feather from 'feather-icons';
import {ReportService} from '../../../service/report.service';
import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { ChartOptions, ChartType, ChartDataSets, Chart } from 'chart.js';
import { DatePipe } from '@angular/common';
import {CurrencyindPipe} from '../../../pipe/currencyind.pipe';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers:[ReportService, DatePipe]
})
export class DashboardComponent implements OnInit, OnDestroy {

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
  //
  dataRefresher: any;
  // 
  // chart js
  // public barChartOptions: any = {
  //   scaleShowVerticalLines: false,
  //   responsive: true
  // };
  // // public barChartLabels: string[] = ['2022-04-29', '2022-04-30', '2022-05-01', '2022-05-02', '2022-05-03', '2022-05-04', '2022-05-05', '2022-05-06', '2022-05-07', '2022-05-08','2022-05-09','2022-05-10','2022-05-11'];
  // public barChartLabels: string[];
  // public barChartType: ChartType = 'bar';
  // public barChartLegend = true;

  // public barChartData: any[] = [
  //   { data: [], label: 'Payin' },
  //   // { data: [49500, 15088206, 11725544.432, 2161366, 3399333.435, 2267189.04, 3994876.162, 6790569, 2090752.629, 7772230.48, 10875933.434, 6582034.22, 3998760.33], label: 'Payin ' },
  //   { data: [], label: 'Payout' }
  // ];
  // // public barChartData: any[];

  payoutLabelDate:any;
  payinLabelDate:any;
  payoutAmount:any;
  payinAmount:any;
  chart: any= [];
  @ViewChild('lineChart', {static: true}) private chartRef:any;
  

  constructor(
    private authService: AuthserviceService,
    private router: Router,
    private reportService: ReportService,
    private datePipe: DatePipe,
  ) { }


  ngOnDestroy(): void {
   this.cancelPageRefresh();
  }

  ngOnInit(): void {
    this.getPAyoutSuccessReport();
    this.getPayoutReportFail();
    //payin
    this.getPayinReportSuccess();
    this.getPayinReportFail();
    //
    // this.getMonthWiseReportPayout();
    // this.getMonthWiseReportPayin();
    //
    registerLocaleData( es );
    // 
    this.refreshData();

  }

  logout(){
    this.authService.logOutUsers();
    this.router.navigate(['/admin'])

  }

  getPAyoutSuccessReport(){
    this.reportService.payoutreportsucess()
    .subscribe(
      (res) =>{
        // console.log(res.data);
        this.successPayouttxnAmount = res.data[0].SuccessPayoutTxnAmount;
        // console.log( this.successPayouttxnAmount)
        this.SuccessPayoutTxnCount =res.data[0].SuccessPayoutTxnCount;
        // console.log(this.SuccessPayoutTxnCount)

      }
    )
  }

  getPayoutReportFail(){
    this.reportService.payoutReportFailur()
    .subscribe(
      (res) =>{
        // console.log(res);
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
        // console.log(res);
        this.SuccessPayinTxnCount =res.data[0].SuccessPayinTxnCount;
        this.SuccessPayinTxnAmount = res.data[0].SuccessPayinTxnAmount
      }
    )
  }

  getPayinReportFail(){
    this.reportService.payinReportFailure()
    .subscribe(
      (res) =>{
        // console.log(res);
        this.FailurePayinTxnCount = res.data[0].FailurePayinTxnCount;
        this.FailurePayinTxnAmount = res.data[0].FailurePayinTxnAmount;
      }
    )
  }

  refreshData(){
    this.dataRefresher = setInterval(()=>{
    this.getPAyoutSuccessReport();
    this.getPayoutReportFail();
    //payin
    this.getPayinReportSuccess();
    this.getPayinReportFail();
    },30000)
  }

  cancelPageRefresh(){
    if(this.dataRefresher){
        clearInterval(this.dataRefresher);
    }    
}

getMonthWiseReportPayout(){
  this.reportService.payoutMonthReport()
  .subscribe(
    (res) =>{
      console.log(res.data)
      // console.log(this.barChartData[0].data)
      this.payoutLabelDate = res.data.map((date:any) => this.datePipe.transform(date.Date, 'dd-MM-yyyy') )
      this.payoutAmount = res.data.map((date:any) => date.TotalAmount)
      console.log(this.payoutLabelDate);
      console.log(this.payoutAmount)

     
      //show chart data 
      this.chart =  new Chart('myChartpayout', {
        type: 'line',
        
        data: {
          labels: this.payoutLabelDate ,
          datasets: [{
              label: 'Payout',
              data: this.payoutAmount,
              borderWidth: 1,
              borderColor:'rgba(255, 159, 64)',
              backgroundColor: "rgba(255, 159, 64,00)",
           
          }]
      },
      options: {
        maintainAspectRatio: true,
     
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              callback: (value:any, index, values) => this.currencyFormat(value).slice(0,3) + "cr"
            }
          }],
          xAxes: [{
            ticks: {
              min: 0,
              
            }
          }],
        }
      },
   
        
      })



    }
  )
}

getMonthWiseReportPayin(){
  this.reportService.payinMonthReport()
  .subscribe(
    (res) =>{
      console.log(res.data);
      this.payinLabelDate = res.data.map((date:any) => this.datePipe.transform(date.Date, 'dd-MM-yyyy') )
      this.payinAmount = res.data.map((date:any) => date.TotalAmount)
      // console.log(this.payinLabelDate);
      // console.log(this.payinAmount)
    
      //show chart data 
      this.chart =  new Chart('myChartpayin', {
        type: 'bar',
        data: {
          labels: this.payinLabelDate ,
          datasets: [{
              label: 'Payin',
              data: this.payinAmount,
              borderWidth: 1,
              backgroundColor: "rgba(153, 102, 255)",
           
          }]
      },
      options: {
        maintainAspectRatio: true,
        responsive: true,  
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              callback: (value:any, index, values) => this.currencyFormat(value).slice(0,3) + "CR"
            }
          }],
          xAxes: [],
        }
      },
   
   
        
      })
    }
  )
}

 currencyFormat (num:any) {
  return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}



// events
public chartClicked(e: any): void {
  console.log(e);
}

public chartHovered(e: any): void {
  console.log(e);
}

public randomize(): void {
  // Only Change 3 values
  const data = [
    Math.round(Math.random() * 100),
    59,
    80,
    (Math.random() * 100),
    56,
    (Math.random() * 100),
    40];
  // const clone = JSON.parse(JSON.stringify(this.barChartData));
  // clone[0].data = data;
  // this.barChartData = clone;
  /**
   * (My guess), for Angular to recognize the change in the dataset
   * it has to change the dataset variable directly,
   * so one way around it, is to clone the data, change it and then
   * assign it;
   */
}


}
