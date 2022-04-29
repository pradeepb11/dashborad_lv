import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { LayoutModule } from './layout/layout.module';
import { ModalModule} from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutModule,
    ModalModule.forRoot()
  ]
})
export class AdminModule { }
