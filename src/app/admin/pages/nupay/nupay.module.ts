import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NupayRoutingModule } from './nupay-routing.module';
import { NupayComponent } from './nupay.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DpDatePickerModule } from 'ng2-date-picker';


@NgModule({
  declarations: [
    NupayComponent
  ],
  imports: [
    CommonModule,
    NupayRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    DpDatePickerModule
  ]
})
export class NupayModule {
  constructor(){
    console.log('Nupay Log Working')
  }
 }
