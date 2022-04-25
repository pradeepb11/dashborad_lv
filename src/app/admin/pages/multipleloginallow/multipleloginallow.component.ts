import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Subject} from 'rxjs';
import {MultipleloginallowService} from '../../../service/multipleloginallow.service';
import {BehaviorSubject} from 'rxjs';
import * as Feather from 'feather-icons';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-multipleloginallow',
  templateUrl: './multipleloginallow.component.html',
  styleUrls: ['./multipleloginallow.component.scss'],
  providers:[MultipleloginallowService]
})
export class MultipleloginallowComponent implements OnInit {
  multipleloginallowList: any;
  p: number = 1;
  total: number = 0;
  filterTerm: string;
  loading: boolean = false;
  MessageDataInfo: boolean = true;
  MessageDataError: boolean = false;
  mypagination = false;
  loginallowForm: FormGroup;
  submitted = false;

  constructor(
    private mtploginallowService: MultipleloginallowService,
    private notification: NotificationService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.retrivewAllData();
    // this.setFormvalid();
  }

  setFormvalid(){
    this.loginallowForm = this.fb.group({
      user_id: new FormControl('')
    })
  }

  pageChangeEvent(event: number){
    this.p = event;
    this.retrivewAllData();
   
}


  retrivewAllData(){
    this.mtploginallowService.retriveAllmultipleloginallow()
    .subscribe(
      (res) =>{
        console.log(res.response.data);
        this.multipleloginallowList = res.response.data;
        this.loading = false;
        this.MessageDataInfo = false;
        this.mypagination = true;
      }
    )
  }

  // chekbox event 
  fieldsChange(values:any):void {

    if (values.target.checked) {
      console.log('checked: ' + values.target.id);
      this.mtploginallowService.loginAllow(values.target.id)
      .subscribe(
        (res) =>{
          console.log(res);
          this.notification.showSuccess('', 'Login Allow Successfully');

          this.retrivewAllData();
        }
      )
   }
  }

  // btn click event
  allowLogin(user_id: number, item:any){
    // console.log(user_id, item);
    this.mtploginallowService.loginAllow(user_id)
    .subscribe(
      (res) =>{
        console.log(res);
        this.notification.showSuccess('', 'Login Allow Successfully');

        this.retrivewAllData();
      }
    )
  }

}
