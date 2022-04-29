import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayoutchargesComponent } from './payoutcharges.component';

const routes: Routes = [{ path: '', component: PayoutchargesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayoutchargesRoutingModule { }
