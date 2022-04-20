import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/helper/auth.guard';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {path: '', component: PagesComponent, children:[
    
      { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate:[AuthGuard] },
      { path: 'nupaylog', loadChildren: () => import('./nupay/nupay.module').then(m => m.NupayModule), canActivate:[AuthGuard] },
      { path: 'merchantprofilelist', loadChildren: () => import('./merchantprofilelist/merchantprofilelist.module').then(m => m.MerchantprofilelistModule), canActivate:[AuthGuard] },
      
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
