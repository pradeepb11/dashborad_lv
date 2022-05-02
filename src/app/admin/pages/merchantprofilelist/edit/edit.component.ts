import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  // present or absence
  ccDetailsPresent: any;
  dcDetailsPresent: any;
  nbDetailsPresent: any;
  upiDetailsPresent: any;

  //
  uipForm: FormGroup;
  ccForm: FormGroup;
  dcForm: FormGroup;
  nbForm: FormGroup;
  setupFeesForm: FormGroup;
  formTest: FormGroup;
  currencyPipe: any;
  totalSum: number;
  netprice: any;

  

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
  this.setupiFormValidte();
  this.setccFormValidte();
  this.setdcFormValidte();
  this.setnbFormValidte();
  this.setsetupFeesFormValidate();


    this.activeRoute.params.subscribe(data =>{
      this.merchantId = data;
      console.log(this.merchantId);
    })

    // get single Recoard Retive
    this.merchantService.merchantSingleData(this.merchantId.id)
    .subscribe(
      (res) =>{
        
        console.log(res.response.data);
        this.ccDetailsPresent = res.response.data.cc_details;
        // console.log(this.ccDetailsPresent);
        
        this.dcDetailsPresent = res.response.data.dc_details;
        // console.log(this.dcDetailsPresent);
        
        this.nbDetailsPresent = res.response.data.nb_details;
        // console.log(this.nbDetailsPresent);
        
        this.upiDetailsPresent = res.response.data.upi_details;
        // console.log(this.upiDetailsPresent);

        this.merchantForm.patchValue(res.response.data.account_details);
      
        this.ccForm.patchValue(res.response.data.cc_details);
        this.dcForm.patchValue(res.response.data.dc_details);
        this.nbForm.patchValue(res.response.data.nb_details);
        this.uipForm.patchValue(res.response.data.upi_details);
       
      }
    )

    
   
    

  }

 



  setUserForm(){
    this.merchantForm = this.formbuilder.group({
      merchant_id: new FormControl(''),
      return_url: new FormControl(''),
      payout_webhook: new FormControl(''),
      url: new FormControl(''),
     })
  }
  
  setupiFormValidte(){
    this.uipForm = this.formbuilder.group({
      merchant_id: new FormControl(''),
      upi_charge_id: new FormControl(''),
      upi_payment_type: new FormControl(''),
      upi_charge_amount: new FormControl(''),
      upi_charge_percentage: new FormControl(''),
      upi_charge_tax_percentage: new FormControl(''),
      upi_partner_charge: new FormControl(''),
    })
  }

  setccFormValidte(){
    this.ccForm = this.formbuilder.group({
      merchant_id: new FormControl(''),
      cc_charge_id: new FormControl(''),
      cc_payment_type: new FormControl(''),
      cc_charge_amount: new FormControl(''),
      cc_charge_percentage: new FormControl(''),
      cc_charge_tax_percentage: new FormControl(''),
      cc_partner_charge: new FormControl(''),
    })
  }

  setdcFormValidte(){
    this.dcForm = this.formbuilder.group({
      merchant_id: new FormControl(''),
      dc_charge_id: new FormControl(''),
      dc_payment_type: new FormControl(''),
      dc_charge_amount: new FormControl(''),
      dc_charge_percentage: new FormControl(''),
      dc_charge_tax_percentage: new FormControl(''),
      dc_partner_charge: new FormControl(''),
    })
  }

  setnbFormValidte(){
    this.nbForm = this.formbuilder.group({
      merchant_id: new FormControl(''),
      nb_charge_id: new FormControl(''),
      nb_payment_type: new FormControl(''),
      nb_charge_amount: new FormControl(''),
      nb_charge_percentage: new FormControl(''),
      nb_charge_tax_percentage: new FormControl(''),
      nb_partner_charge: new FormControl(''),
    })
  }

  setsetupFeesFormValidate(){
    
    this.setupFeesForm = this.formbuilder.group({
      // merchant_id: new FormControl(''),
      setupfeesamtcharge: new FormControl(''),
      gst: new FormControl(''),
      // unitTotalPrice: new FormControl('')

    })
  }

  filterCatalogues(event:any){
    let test = this.setupFeesForm.get('setupfeesamtcharge').value;
    let test1 = this.setupFeesForm.get('gst').value;
    // console.log(test, test1);

    let gstamt=  (test*test1)/100;
    // console.log(gstamt);
    this.netprice = test+gstamt ;

  }

  

  









  merchantEditOnSumbmit(){
    console.log(this.merchantForm.value);
    this.merchantService.merchantWebhookUpdate(this.merchantForm.value)
    .subscribe(
      (res) =>{
        console.log(res)
        this.notification.showSuccess('', 'Merchant updated successfully');
        this.merchantForm.reset();
        this.route.navigate(['/dashboard/merchantprofilelist'])
      }
    )

  }

  upiEditSumbmit(){
    console.log(this.uipForm.value);
    this.merchantService.paymentProccessorMerchant(this.uipForm.value)
    .subscribe(
      (res) =>{
        this.notification.showSuccess('', 'Updated successfully');
        this.merchantForm.reset();
        this.route.navigate(['/dashboard/merchantprofilelist'])
      }
    )
  }

  ccEditSumbmit(){
    console.log(this.ccForm.value);
    this.merchantService.paymentProccessorMerchant(this.ccForm.value)
    .subscribe(
      (res) =>{
        this.notification.showSuccess('', 'Updated successfully');
        this.merchantForm.reset();
        this.route.navigate(['/dashboard/merchantprofilelist'])
      }
    )
  }
  dcEditSumbmit(){
    console.log(this.dcForm.value);
    this.merchantService.paymentProccessorMerchant(this.dcForm.value)
    .subscribe(
      (res) =>{
        this.notification.showSuccess('', 'Updated successfully');
        this.merchantForm.reset();
        this.route.navigate(['/dashboard/merchantprofilelist'])
      }
    )
  }
  nbEditSumbmit(){
    console.log(this.nbForm.value);
    this.merchantService.paymentProccessorMerchant(this.nbForm.value)
    .subscribe(
      (res) =>{
        console.log(res);
        this.notification.showSuccess('', 'Updated successfully');
        this.merchantForm.reset();
        this.route.navigate(['/dashboard/merchantprofilelist'])
      }
    )
  }

  setupfeesEditOnSumbmit(){
    console.log('testing')
  }


  backToHome(){
    this.route.navigate(['/dashboard/merchantprofilelist']);
  }




}
