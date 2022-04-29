import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NupaytransactionRoutingModule } from './nupaytransaction-routing.module';
import { NupaytransactionComponent } from './nupaytransaction.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DpDatePickerModule } from 'ng2-date-picker';


@NgModule({
  declarations: [
    NupaytransactionComponent
  ],
  imports: [
    CommonModule,
    NupaytransactionRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    DpDatePickerModule
  ]
})
export class NupaytransactionModule { }
