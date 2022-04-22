import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MerchantService } from 'src/app/service/merchant.service';
import * as Feather from 'feather-icons';
import {Location} from '@angular/common';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, AfterViewInit {
  id: any
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private merchantService:MerchantService,
    private _location: Location
  ) { }


  ngAfterViewInit(): void {
    Feather.replace();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']; 
    // console.log(this.id)

    this.getSingleDataDisplay();

  }
  back(){
    // alert('WOrking On ');
    this._location.back();
    // this.router.navigate(['dashboard/merchantprofilelist'])
  }

  getSingleDataDisplay(){
    this.merchantService.merchantSingleData(this.id)
    .subscribe(
      (res) =>{
        console.log(res);
      }
    )
  }

}
