import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MultipleloginallowRoutingModule } from './multipleloginallow-routing.module';
import { MultipleloginallowComponent } from './multipleloginallow.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DpDatePickerModule } from 'ng2-date-picker';


@NgModule({
  declarations: [
    MultipleloginallowComponent
  ],
  imports: [
    CommonModule,
    MultipleloginallowRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    DpDatePickerModule
  ]
})
export class MultipleloginallowModule { }
