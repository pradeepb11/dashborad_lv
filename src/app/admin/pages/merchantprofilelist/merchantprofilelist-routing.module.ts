import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { MerchantprofilelistComponent } from './merchantprofilelist.component';

const routes: Routes = [
  { path: '', component: MerchantprofilelistComponent },
  {path:'edit/:id', component: EditComponent}
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantprofilelistRoutingModule { }
