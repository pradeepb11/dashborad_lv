import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NupayComponent } from './nupay.component';

const routes: Routes = [{ path: '', component: NupayComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NupayRoutingModule { }
