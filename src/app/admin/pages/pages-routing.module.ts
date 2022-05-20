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
      { path: 'amtreport', loadChildren: () => import('./amtreport/amtreport.module').then(m => m.AmtreportModule), data:{ title: ' Amount Report'} },
      { path: 'payoutcharges', loadChildren: () => import('./payoutcharges/payoutcharges.module').then(m => m.PayoutchargesModule), data:{ title: 'Daily Payout Charges'} },
      { path: 'nupaytransaction', loadChildren: () => import('./nupaytransaction/nupaytransaction.module').then(m => m.NupaytransactionModule), data:{ title: 'Nupay Transaction Log'} },
      { path: 'txnstatus', loadChildren: () => import('./tech/transactionstatus/transactionstatus.module').then(m => m.TransactionstatusModule) },
      
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
