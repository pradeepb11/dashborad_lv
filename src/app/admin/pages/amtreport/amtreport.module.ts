import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AmtreportRoutingModule } from './amtreport-routing.module';
import { AmtreportComponent } from './amtreport.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DpDatePickerModule } from 'ng2-date-picker';
import { PayoutreportComponent } from './payoutreport/payoutreport.component';
import { PayinreportComponent } from './payinreport/payinreport.component';
import { AmountreportComponent } from './amountreport/amountreport.component';


@NgModule({
  declarations: [
    AmtreportComponent,
    PayoutreportComponent,
    PayinreportComponent,
    AmountreportComponent
  ],
  imports: [
    CommonModule,
    AmtreportRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    DpDatePickerModule
  ]
})
export class AmtreportModule { }
