import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantprofilelistComponent } from './merchantprofilelist.component';

const routes: Routes = [{ path: '', component: MerchantprofilelistComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantprofilelistRoutingModule { }
