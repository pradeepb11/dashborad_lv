import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantprofilelistComponent } from './merchantprofilelist.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: '', component: MerchantprofilelistComponent },
  {path:'view/:id',  component: ViewComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantprofilelistRoutingModule { }
