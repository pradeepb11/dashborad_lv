import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/helper/auth.guard';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {path: '', component: PagesComponent, children:[
    
      { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate:[AuthGuard] },
      { path: 'nupaylog', loadChildren: () => import('./nupay/nupay.module').then(m => m.NupayModule), canActivate:[AuthGuard], data:{ title: ' Nupay Log'} },
      { path: 'merchantprofilelist', loadChildren: () => import('./merchantprofilelist/merchantprofilelist.module').then(m => m.MerchantprofilelistModule), canActivate:[AuthGuard], data:{ title: ' Merchant Profile List'}  },
      { path: 'multipleloginallow', loadChildren: () => import('./multipleloginallow/multipleloginallow.module').then(m => m.MultipleloginallowModule), data:{ title: ' Multiple Login Allow'}  },
      { path: 'mailverificationotp', loadChildren: () => import('./emailverificationotp/emailverificationotp.module').then(m => m.EmailverificationotpModule), data:{ title: ' Email Verification OTP'}  },
      
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
