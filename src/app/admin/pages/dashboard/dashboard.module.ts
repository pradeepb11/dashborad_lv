import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { NgChartjsModule } from 'ng-chartjs';
import { DpDatePickerModule } from 'ng2-date-picker';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterModule,
    NgChartjsModule,
    DpDatePickerModule
  ]
})
export class DashboardModule { 
  constructor(){
    console.log('Dashboard Module Work')
  }
}
