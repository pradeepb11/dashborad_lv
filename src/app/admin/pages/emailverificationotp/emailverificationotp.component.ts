import { Component, OnInit } from '@angular/core';
import {EmailverificationotpService, verifiactionEmail, sendEmailInfo} from '../../../service/emailverificationotp.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Subject} from 'rxjs';
import {BehaviorSubject} from 'rxjs';
import * as Feather from 'feather-icons';
import { Router } from '@angular/router';



@Component({
  selector: 'app-emailverificationotp',
  templateUrl: './emailverificationotp.component.html',
  styleUrls: ['./emailverificationotp.component.scss'],
  providers:[EmailverificationotpService]
})
export class EmailverificationotpComponent implements OnInit {
  submitted = false;
  filterFormEmailverification: FormGroup;
  emailverifylistList:any[];
  paginationList:any[];
  p: number = 1;
  total: number = 0;
  filterTerm: string;

  loading: boolean = false;
  MessageDataInfo: boolean = true;
  MessageDataError: boolean = false;
  mypagination = false;
  emailverification:any;
 


  constructor(
    private emailverifyService: EmailverificationotpService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setfilterFormValidate();
  }

  setfilterFormValidate(){
    this.filterFormEmailverification = this.fb.group({
      email_id: new FormControl('', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]),
      // [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]
    })
  }

  get f() { return this.filterFormEmailverification.controls; }

  pageChangeEvent(event: number){
    this.p = event;
    this.applyFilter();
   
}

applyFilter(){
  this.loading = true;
  this.emailverifyService.merchantDataFilter(this.filterFormEmailverification.value)
  .subscribe(
    (res) =>{
      console.log(res);
      if(res.response.status === 'failure'){
        this.loading = false;
        this.MessageDataInfo = false;
        this.MessageDataError = true;
        this.filterFormEmailverification.reset();
        this.emailverifylistList = [];
      }else if(res.response.status === 'Success'){
        this.loading = false;
        this.MessageDataInfo = false;
        this.MessageDataError = false;
        this.emailverifylistList = res.response.data;
        this.mypagination = true;
        this.filterFormEmailverification.reset();
        
      }

      
      
    }
  )
}

resetDate(){
  this.filterFormEmailverification.reset();
  this.emailverifylistList = [];
  this.MessageDataInfo = true; 
  this.mypagination = false;
}

// send email verification
sendEmailverification(item:verifiactionEmail, user_id: number){
  console.log(item);
  console.log(user_id);

  let sender_id = 'minas.s@paynet.co.in';
  let receiver_id = 'pradeep.b@paynet.co.in';
  let body = `<!DOCTYPE html>
  <html>
  <head>

  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Verification OTP</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css">
  <style type="text/css">
  /**
   * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
   *//**
   * Avoid browser level font resizing.
   * 1. Windows Mobile
   * 2. iOS / OSX
   */
  body,
  table,
  td,
  a {
  -ms-text-size-adjust: 100%; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  }

  /**
   * Remove extra space added to tables and cells in Outlook.
   */
  table,
  td {
  mso-table-rspace: 0pt;
  mso-table-lspace: 0pt;
  }

  /**
   * Better fluid images in Internet Explorer.
   */
  img {
  -ms-interpolation-mode: bicubic;
  }

  /**
   * Remove blue links for iOS devices.
   */
  a[x-apple-data-detectors] {
  font-family: inherit !important;
  font-size: inherit !important;
  font-weight: inherit !important;
  line-height: inherit !important;
  color: inherit !important;
  text-decoration: none !important;
  }

  /**
   * Fix centering issues in Android 4.4.
   */
  div[style*="margin: 16px 0;"] {
  margin: 0 !important;
  }

  body {
  width: 100% !important;
  height: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
  }

  /**
   * Collapse table borders to avoid space between cells.
   */
  table {
  border-collapse: collapse !important;
  }

  a {
  color: #1a82e2;
  }

  img {
  height: auto;
  line-height: 100%;
  text-decoration: none;
  border: 0;
  outline: none;
  }
  .c-email__code {
  display: block;
  width: 100%;
  margin: 0px auto;
  background-color: #ddd;
  border-radius: 40px;
  padding: 20px;
  text-align: center;
  font-size: 36px;
  font-family: "Open Sans";
  letter-spacing: 10px;
  box-shadow: 0px 7px 22px 0px rgba(0, 0, 0, 0.1);
  }
  .c-email__content {
  width: auto;
  /*height: 300px;*/
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  background-color: #fff;
  /*padding: 15px;*/
  }
  .text-title {
  font-family: "Open Sans";
  }

  .text-center {
  text-align: center;
  }

  .text-italic {
  font-style: italic;
  }

  .opacity-30 {
  opacity: 0.3;
  }

  .mb-0 {
  margin-bottom: 0;
  }
  </style>

  </head>
  <body style="background-color: #e9ecef;">

  <!-- start preheader -->
  <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
  A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
  </div>
  <!-- end preheader -->

  <!-- start body -->
  <table border="0" cellpadding="0" cellspacing="0" width="100%">

  <!-- start logo -->
  <tr>
  <td align="center" bgcolor="#e9ecef">
  <!--[if (gte mso 9)|(IE)]>
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
  <tr>
  <td align="center" valign="top" width="600">
  <![endif]-->

  <!--[if (gte mso 9)|(IE)]>
  </td>
  </tr>
  </table>
  <![endif]-->
  </td>
  </tr>
  <!-- end logo -->

  <!-- start hero -->
  <tr>
  <td align="center" bgcolor="#e9ecef">
  <!--[if (gte mso 9)|(IE)]>
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
  <tr>
  <td align="center" valign="top" width="600">
  <![endif]-->
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
  <tr>
    <td align="center" bgcolor="#ffffff" style="padding: 20px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
        <img src="https://dashboard.paynet.co.in/dashboard-ui/assets/images/paynet.png" alt="Logo" border="0" style="display: block; max-width: 150px; text-align:left;">
      </a>
    </td>
  </tr>
  </table>
  <!--[if (gte mso 9)|(IE)]>
  </td>
  </tr>
  </table>
  <![endif]-->
  </td>
  </tr>
  <!-- end hero -->

  <!-- start copy block -->
  <tr>
  <td align="center" bgcolor="#e9ecef">
  <!--[if (gte mso 9)|(IE)]>
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
  <tr>
  <td align="center" valign="top" width="600">
  <![endif]-->
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

  <!-- start copy -->
  <tr>
    <td align="left" bgcolor="#ffffff" style="padding: 20px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
      <p style="margin: 0;">Dear ${item.name}, <br>

    </td>
  </tr>
  <!-- end copy -->

  <!-- start button -->
  <tr>
    <td align="left" bgcolor="#ffffff">
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td align="center" bgcolor="#ffffff" style="padding: 5px;">
            <table border="0" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                    <div class="c-email__content">
                        <p class="c-email__content__text text-title" style="color:#a1a1a1; font-size: 20px; line-height:30px">
  Here is your One Time Password <br>
  To Validate Your Account
  </p>
                  <div class="c-email__code">
  <span class="c-email__code__text">${item.code}</span>
  </div>
  <p class="c-email__content__text text-italic  text-title mb-0" style="color:red">Verification code is valid only for 30 minutes</p>
  </div>
                  
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <!-- end button -->

  <!-- start copy -->
  <tr>
    <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
      <p style="margin: 0;">Regards,</p>
      <p style="margin: 0;">Carnelian Payment Networks India Private Ltd</p>
      <p style="margin: 0;"><a href="https://paynet.co.in/" target="_blank">www.paynet.co.in</a></p>
    </td>
  </tr>
  <!-- end copy -->

  <!-- start copy -->
  <tr>
    <td align="center" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 0.5px solid #d4dadf">
    <a href="https://www.facebook.com/carnelianpayments/" style="color: #000;"> <i class="fab fa-facebook fa-fw"  style="font-size:20px;"></i></a> 
      <a href="https://www.instagram.com/paynet_india/" style="color: #000;"><i class="fab fa-instagram-square fa-fw " style="font-size:20px;"></i></a>
      <a href="https://www.linkedin.com/company/13201300/admin/" style="color: #000;"><i class="fab fa-linkedin fa-fw" style="font-size:20px;"></i></a>
    </td>
  </tr>
  <tr>
    <td align="center" bgcolor="#ffffff" style="" class="text-italic  text-title mb-0" >
      <p style="font-size:14px">Important: Please do not share your OTP, password or sensitive information with anyone.</p>
    </td>
  </tr>
  <!-- end copy -->

  </table>
  <!--[if (gte mso 9)|(IE)]>
  </td>
  </tr>
  </table>
  <![endif]-->
  </td>
  </tr>
  <!-- end copy block -->

  <!-- start footer -->
  <tr>
  <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
  <!--[if (gte mso 9)|(IE)]>
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
  <tr>
  <td align="center" valign="top" width="600">
  <![endif]-->

  <!--[if (gte mso 9)|(IE)]>
  </td>
  </tr>
  </table>
  <![endif]-->
  </td>
  </tr>
  <!-- end footer -->

  </table>
  <!-- end body -->

  </body>
  </html>`;
  let subject = 'Verification OTP';
  let sender_name = 'Minaz';
  let receiver_name = item.name;

  // console.log(senderId, receiver_id, body, subject, sendrName, receiverName);


  this.emailverifyService.sendEmailData({sender_id, receiver_id, body, subject, sender_name, receiver_name})
  .subscribe(
    (res) =>{
      console.log(res);
    }
  )

}

}
