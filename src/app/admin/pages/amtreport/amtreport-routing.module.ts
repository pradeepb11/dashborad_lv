import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmtreportComponent } from './amtreport.component';

const routes: Routes = [{ path: '', component: AmtreportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmtreportRoutingModule { }
