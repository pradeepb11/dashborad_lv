import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  {
    path:'',
    redirectTo:'admin',
    pathMatch: 'full'
  },
  // { path: 'dashboard', loadChildren: () => import('./admin/pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'dashboard', loadChildren: () => import('./admin/pages/pages.module').then(m => m.PagesModule) },
  // { path: 'nupay', loadChildren: () => import('./admin/pages/nupay/nupay.module').then(m => m.NupayModule) },
  {
    path:'**',
    redirectTo:'admin'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
