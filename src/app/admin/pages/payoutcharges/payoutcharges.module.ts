import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayoutchargesRoutingModule } from './payoutcharges-routing.module';
import { PayoutchargesComponent } from './payoutcharges.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DpDatePickerModule } from 'ng2-date-picker';


@NgModule({
  declarations: [
    PayoutchargesComponent
  ],
  imports: [
    CommonModule,
    PayoutchargesRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    DpDatePickerModule
  ]
})
export class PayoutchargesModule { }
