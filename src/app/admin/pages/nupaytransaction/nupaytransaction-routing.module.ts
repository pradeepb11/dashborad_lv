import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NupaytransactionComponent } from './nupaytransaction.component';

const routes: Routes = [{ path: '', component: NupaytransactionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NupaytransactionRoutingModule { }
