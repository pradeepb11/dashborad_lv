import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../helper/auth.guard';
import { AdminComponent } from './admin.component';

const routes: Routes = [

  {path: '', children:[
    { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), canActivate:[AuthGuard]  },
  ]}



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
