import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmountreportComponent } from './amountreport/amountreport.component';
import { AmtreportComponent } from './amtreport.component';
import { PayinreportComponent } from './payinreport/payinreport.component';
import { PayoutreportComponent } from './payoutreport/payoutreport.component';

const routes: Routes = [
  {path:'amountreport', component:AmountreportComponent},
  {path:'payoutreport', component:PayoutreportComponent},
  {path:'payinreport', component: PayinreportComponent}
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmtreportRoutingModule { }
