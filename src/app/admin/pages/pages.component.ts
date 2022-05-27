import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, map } from "rxjs/operators";
import * as Feather from 'feather-icons';
import {ReportService} from '../../service/report.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  providers:[ReportService]
})
export class PagesComponent implements OnInit, AfterViewInit {

  dataRefresher: any;
  sysAlertReport:any;
  sysAlertReportpayout: any;
  infoAlertBar: boolean = false;
  infoAlertBarPayout: boolean = false;
  

  constructor(
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private reportService:ReportService
  ) { 

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
          let child = this.activatedRoute.firstChild;
          while (child) {
              if (child.firstChild) {
                  child = child.firstChild;
              } else if (child.snapshot.data &&    child.snapshot.data['title']) {
                  return child.snapshot.data['title'];
              } else {
                  return null;
              }
          }
          return null;
      })
  ).subscribe( (data: any) => {
      if (data) {
          this.titleService.setTitle('Paynet' + '-  '+ data);
      }
  });
    
  }
  ngAfterViewInit(): void {
    Feather.replace();
  }

  // public setTitle(newTitle: string) {
  //   this.titleService.setTitle(newTitle);
  // }

  ngOnInit(): void {
    
    this.getSYSalertReport();
    this.getSYSalertReportPayout();
    this.refreshData();
  }

  getSYSalertReport(){
    this.reportService.SYSalertReport()
    .subscribe(
      (res) =>{
        // console.log(res.data[0].nooftransactions)
        this.sysAlertReport = res.data[0].nooftransactions;
        this.infoAlertBar = true;
        
      }
    )
  }

  getSYSalertReportPayout(){
    this.reportService.SysAlertReportPayout()
    .subscribe(
      (res) =>{
        // console.log(res.data[0].No_of_Transactions);
        this.sysAlertReportpayout = res.data[0].No_of_Transactions;
        this.infoAlertBarPayout = true;
      }
    )
  }

  refreshData(){
    this.dataRefresher = setInterval(()=>{
    this.getSYSalertReport();
    this.getSYSalertReportPayout();
    },10000)
  }


}
