import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
import {MerchantService} from '../../../../service/merchant.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers:[MerchantService]
})
export class EditComponent implements OnInit {
  merchantId:any;
  merchantForm: FormGroup
  submitted: false;

  constructor(
    private route: Router,
    private activeRoute: ActivatedRoute,
    private merchantService: MerchantService,
    private formbuilder: FormBuilder,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
  // validate form
  this.setUserForm();

    this.activeRoute.params.subscribe(data =>{
      this.merchantId = data;
      console.log(this.merchantId);
    })

    // get single Recoard Retive
    this.merchantService.merchantSingleData(this.merchantId.id)
    .subscribe(
      (res) =>{
        console.log(res.response.data);
        this.merchantForm.patchValue(res.response.data[0])
       
      }
    )

    


  }

  setUserForm(){
    this.merchantForm = this.formbuilder.group({
      merchant_id: new FormControl(),
      return_url: new FormControl(''),
      payout_webhook: new FormControl(''),
      url: new FormControl(''),
     
    })
  }
  
  get f() { return this.merchantForm.controls; }


  merchantEditOnSumbmit(){
    // console.log(this.merchantForm.value);
    this.merchantService.merchantWebhookUpdate(this.merchantForm.value)
    .subscribe(
      (res) =>{
        this.notification.showSuccess('', 'Merchant updated successfully');
        this.merchantForm.reset();
        this.route.navigate(['/dashboard/merchantprofilelist'])
      }
    )

  }

  backToHome(){
    this.route.navigate(['/dashboard/merchantprofilelist']);
  }




}
