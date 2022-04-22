import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MultipleloginallowComponent } from './multipleloginallow.component';

const routes: Routes = [{ path: '', component: MultipleloginallowComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MultipleloginallowRoutingModule { }
