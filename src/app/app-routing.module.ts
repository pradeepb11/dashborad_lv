import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), data:{ title: ' Login'} },
  {
    path:'',
    redirectTo:'admin',
    pathMatch: 'full'
  },
  
  { path: 'dashboard', loadChildren: () => import('./admin/pages/pages.module').then(m => m.PagesModule), data:{ title: ' Dashboard'} },
  
  
  
  
  
 
  
  
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
