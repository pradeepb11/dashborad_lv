import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchantprofilelistRoutingModule } from './merchantprofilelist-routing.module';
import { MerchantprofilelistComponent } from './merchantprofilelist.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DpDatePickerModule } from 'ng2-date-picker';
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [
    MerchantprofilelistComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    MerchantprofilelistRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    DpDatePickerModule

  ]
})
export class MerchantprofilelistModule { }
