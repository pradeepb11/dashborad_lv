import { Component, OnInit } from '@angular/core';
import {EmailverificationotpService, verifiactionEmail, sendEmailInfo} from '../../../service/emailverificationotp.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Subject} from 'rxjs';
import {BehaviorSubject} from 'rxjs';
import * as Feather from 'feather-icons';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';



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
    private router: Router,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.setfilterFormValidate();
    this.getEmailVerificationRetive();
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

  // retrive 10 data email verification 
  getEmailVerificationRetive(){
    this.emailverifyService.merchantDataRetrive()
    .subscribe(
    (res) => {
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
        this.mypagination = false;
        this.filterFormEmailverification.reset();
        
      }
    }
    )
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
        // this.filterFormEmailverification.reset();
        
      }

      
      
    }
  )
}



resetDate(){
  this.filterFormEmailverification.reset();
  // this.emailverifylistList = [];
  this.getEmailVerificationRetive();
  this.MessageDataInfo = true; 
  this.mypagination = false;
}

// send email verification
sendEmailverification(item:verifiactionEmail, user_id: number){
  console.log(item);
  console.log(user_id);

  let sender_id = 'minas.s@paynet.co.in';
  let receiver_id = item.email;
  let bbodyTest = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
      <title>Verification OTP</title>
      <style type="text/css">
        /* reset */
        article,aside,details,figcaption,figure,footer,header,hgroup,nav,section,summary{display:block}audio,canvas,video{display:inline-block;*display:inline;*zoom:1}audio:not([controls]){display:none;height:0}[hidden]{display:none}html{font-size:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}html,button,input,select,textarea{font-family:sans-serif}body{margin:0}a:focus{outline:thin dotted}a:active,a:hover{outline:0}h1{font-size:2em;margin:0 0.67em 0}h2{font-size:1.5em;margin:0 0 .83em 0}h3{font-size:1.17em;margin:1em 0}h4{font-size:1em;margin:1.33em 0}h5{font-size:.83em;margin:1.67em 0}h6{font-size:.75em;margin:2.33em 0}abbr[title]{border-bottom:1px dotted}b,strong{font-weight:bold}blockquote{margin:1em 40px}dfn{font-style:italic}mark{background:#ff0;color:#000}p,pre{margin:1em 0}code,kbd,pre,samp{font-family:monospace,serif;_font-family:'courier new',monospace;font-size:1em}pre{white-space:pre;white-space:pre-wrap;word-wrap:break-word}q{quotes:none}q:before,q:after{content:'';content:none}small{font-size:75%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-0.5em}sub{bottom:-0.25em}dl,menu,ol,ul{margin:1em 0}dd{margin:0 0 0 40px}menu,ol,ul{padding:0 0 0 40px}nav ul,nav ol{list-style:none;list-style-image:none}img{border:0;-ms-interpolation-mode:bicubic}svg:not(:root){overflow:hidden}figure{margin:0}form{margin:0}fieldset{border:1px solid #c0c0c0;margin:0 2px;padding:.35em .625em .75em}legend{border:0;padding:0;white-space:normal;*margin-left:-7px}button,input,select,textarea{font-size:100%;margin:0;vertical-align:baseline;*vertical-align:middle}button,input{line-height:normal}button,html input[type="button"],input[type="reset"],input[type="submit"]{-webkit-appearance:button;cursor:pointer;*overflow:visible}button[disabled],input[disabled]{cursor:default}input[type="checkbox"],input[type="radio"]{box-sizing:border-box;padding:0;*height:13px;*width:13px}input[type="search"]{-webkit-appearance:textfield;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box}input[type="search"]::-webkit-search-cancel-button,input[type="search"]::-webkit-search-decoration{-webkit-appearance:none}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}textarea{overflow:auto;vertical-align:top}table{border-collapse:collapse;border-spacing:0}
  
        /* custom client-specific styles including styles for different online clients */
        .ReadMsgBody{width:100%;} .ExternalClass{width:100%;} /* hotmail / outlook.com */
        .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div{line-height:100%;} /* hotmail / outlook.com */
        table, td{mso-table-lspace:0pt; mso-table-rspace:0pt;} /* Outlook */
        #outlook a{padding:0;} /* Outlook */
        img{-ms-interpolation-mode: bicubic;display:block;outline:none; text-decoration:none;} /* IExplorer */
        body, table, td, p, a, li, blockquote{-ms-text-size-adjust:100%; -webkit-text-size-adjust:100%; font-weight:normal!important;}
        .ExternalClass td[class="ecxflexibleContainerBox"] h3 {padding-top: 10px !important;} /* hotmail */
  
        /* email template styles */
        h1{display:block;font-size:26px;font-style:normal;font-weight:normal;line-height:100%;}
        h2{display:block;font-size:20px;font-style:normal;font-weight:normal;line-height:120%;}
        h3{display:block;font-size:17px;font-style:normal;font-weight:normal;line-height:110%;}
        h4{display:block;font-size:18px;font-style:italic;font-weight:normal;line-height:100%;}
        .flexibleImage{height:auto;}
        table[class=flexibleContainerCellDivider] {padding-bottom:0 !important;padding-top:0 !important;}
  
        body, #bodyTbl{background-color:#E1E1E1;}
        #emailHeader{background-color:#E1E1E1;}
        #emailBody{background-color:#ffffff;}
        #emailFooter{background-color:#E1E1E1;}
        .textContent {color:#8B8B8B; font-family:Helvetica; font-size:16px; line-height:125%; text-align:Left;}
        .textContent a{color:#205478; text-decoration:underline;}
        .emailButton{background-color:#205478; border-collapse:separate;}
        .buttonContent{color:#ffffff; font-family:Helvetica; font-size:18px; font-weight:bold; line-height:100%; padding:15px; text-align:center;}
        .buttonContent a{color:#ffffff; display:block; text-decoration:none!important; border:0!important;}
        #invisibleIntroduction {display:none;display:none !important;} /* hide the introduction text */
  
        /* other framework hacks and overrides */
        span[class=ios-color-hack] a {color:#275100!important;text-decoration:none!important;} /* Remove all link colors in IOS (below are duplicates based on the color preference) */
        span[class=ios-color-hack2] a {color:#205478!important;text-decoration:none!important;}
        span[class=ios-color-hack3] a {color:#8B8B8B!important;text-decoration:none!important;}
        /* phones and sms */
        .a[href^="tel"], a[href^="sms"] {text-decoration:none!important;color:#606060!important;pointer-events:none!important;cursor:default!important;}
        .mobile_link a[href^="tel"], .mobile_link a[href^="sms"] {text-decoration:none!important;color:#606060!important;pointer-events:auto!important;cursor:default!important;}

        .c-email__code{display: block; width: 100%; margin: 0px auto; background-color: #ddd; border-radius: 40px; font-size: 30px; padding: 20px; text-align: center;  font-family: "Open Sans"; letter-spacing: 10px; box-shadow: 0px 7px 22px 0px rgba(0, 0, 0, 0.1);}.c-email__content{width: auto; /*height: 300px;*/ display: flex; flex-direction: column; justify-content: space-around; align-items: center; flex-wrap: wrap; background-color: #fff; /*padding: 15px;*/}.text-title{font-family: "Open Sans";}.text-center{text-align: center;}.text-italic{font-style: italic;}.opacity-30{opacity: 0.3;}.mb-0{margin-bottom: 0;}

        /* responsive styles */
        @media only screen and (max-width: 480px){
          body{width:100% !important; min-width:100% !important;}
          table[id="emailHeader"], table[id="emailBody"], table[id="emailFooter"], table[class="flexibleContainer"] {width:100% !important;}
          td[class="flexibleContainerBox"], td[class="flexibleContainerBox"] table {display: block;width: 100%;text-align: left;}
          td[class="imageContent"] img {height:auto !important; width:100% !important; max-width:100% !important;}
          img[class="flexibleImage"]{height:auto !important; width:100% !important;max-width:100% !important;}
          img[class="flexibleImageSmall"]{height:auto !important; width:auto !important;}
          table[class="flexibleContainerBoxNext"]{padding-top: 10px !important;}
          table[class="emailButton"]{width:100% !important;}
          td[class="buttonContent"]{padding:0 !important;}
          td[class="buttonContent"] a{padding:15px !important;}

        }
      </style>
      <!--
        MS Outlook custom styles
      -->
      <!--[if mso 12]>
        <style type="text/css">
          .flexibleContainer{display:block !important; width:100% !important;}
        </style>
      <![endif]-->
      <!--[if mso 14]>
        <style type="text/css">
          .flexibleContainer{display:block !important; width:100% !important;}
        </style>
      <![endif]-->
    </head>
    <body bgcolor="#ffffff" leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0">
      <center style="background-color:#ffffff;">
        <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTbl" style="table-layout: fixed;max-width:100% !important;width: 100% !important;min-width: 100% !important;">
          <tr>
            <td align="center" valign="top" id="bodyCell">
  
              
  
              <table bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" width="500" id="emailBody">
  
                <tr>
                  <td align="center" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="color:#ffffff;" bgcolor="#ffffff; >
                      <tr>
                        <td align="center" valign="top">
                          <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer">
                            <tr>
                              <td align="center" valign="top" width="500" class="flexibleContainerCell">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                  <tr>
                                    <td align="center" valign="top" class="textContent" align="center" bgcolor="#ffffff" style="font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-bottom: 0.5px solid #d4dadf;">
                                    <h2 style="color:#366ca3; font-size:30px;font-weight:bold; text-align:center">pay<span style="color:#ee8137">net</span></h2>  
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
  
                <tr>
                  <td align="center" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td align="center" valign="top">
                          <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer">
                            <tr>
                              <td align="center" valign="top" width="500" class="flexibleContainerCell">
  
  
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
  
                <tr>
                  <td align="center" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td align="center" valign="top">
                          <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer">
                            <tr>
                              <td align="center" valign="top" width="500" class="flexibleContainerCell">
                                <table border="0" cellpadding="30" cellspacing="0" width="100%">
                                  <tr>
                                    <td align="center" valign="top" bgcolor="#ffffff">
  
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
                                              <td align="center">
                                              <p class="c-email__content__text text-title" style="color:#a1a1a1;font-size: 20px; line-height:30px">
                                              Here is your One Time Password <br>
                                              To Validate Your Account
                                             </p>
                                              </td>
                                              </tr>
                                                <tr>
                                                  <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                                                      <div class="c-email__content">
                                                        
                                                    <div class="c-email__code">
                                <span class="c-email__code__text">${item.code}</span>
                              </div>
                            
                            </div>
                                                   
                                                  </td>
                                                </tr>
                                                <tr>
                                                <td align="center">
                                                <p class="c-email__content__text text-italic  text-title mb-0" style="color:red">Verification code is valid only for 30 minutes</p>
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
  
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
  
              
  
              </table>
  
              <!-- footer -->
              <table bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" width="500" id="emailFooter">
                <tr>
                  <td align="center" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td align="center" valign="top">
                          <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer">
                            <tr>
                              <td align="center" valign="top" width="500" class="flexibleContainerCell">
                                <table border="0" cellpadding="30" cellspacing="0" width="100%">
                                  <tr>
                                    <td valign="top" bgcolor="#ffffff">
  
                                      <div style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#828282;text-align:center;line-height:120%;">
                                      <div>Paynet.co.in Copyright &#169; 2022. All rights reserved.</div>
                                       
                                      </div>
  
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <!-- // end of footer -->
  
            </td>
          </tr>
        </table>
      </center>
    </body>
  </html>`;
  let subject = 'Verification OTP';
  let sender_name = 'Minaz';
  let receiver_name = item.name;
    let body = bbodyTest;
  // let body = JSON.stringify(bbodyTest);
  // console.log(bbodyTest)
  // console.log(sender_id, receiver_id, body, subject, sender_name, receiver_name);


  this.emailverifyService.sendEmailData({sender_id, receiver_id, body, subject, sender_name, receiver_name})
  .subscribe(
    (res) =>{
      console.log(res);
      this.notification.showSuccess('', 'Email Sent successfully');
      this.emailverifylistList = [];
      console.log(res);
    }
  )

}

}
