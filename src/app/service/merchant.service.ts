import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError,  map,  tap } from 'rxjs/operators'; 
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


const baseUrl = `${environment.apiUrl}`
// const localUrl = `${environment.apiUrllocal}`

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  constructor(
    private _http: HttpClient
  ) { }


  merchantDataFilter(merchantinfo: merchantInfo): Observable<any>{
    return this._http.post(`${baseUrl}filter_merchant_list`, merchantinfo, httpOptions)
    catchError(this.handleError)

  }



  // single data display
  merchantSingleData(merchant_id: number): Observable<any>{
    return this._http.get(`${baseUrl}single_merchant_details/${merchant_id}`, httpOptions)
    catchError(this.handleError);
  } 

  
  // update merchant webhook 
  merchantWebhookUpdate(merchantwebhook: merchantWebhook): Observable<any>{
    return this._http.post<any>(`${baseUrl}merchant_account_update`, merchantwebhook, httpOptions)
    catchError(this.handleError)
  }

  //merchant Payment Proccessor  CC, NB, DC, UPI
  paymentProccessorMerchant(data: any):Observable<any>{
    return this._http.put<any>(`${baseUrl}merchant_processor`, data, httpOptions)
    catchError(this.handleError)
  }


  private handleError(err: HttpErrorResponse){

    let errorMessage = '';
    if(err.error instanceof ErrorEvent){
        errorMessage = `An error occurred ${err.error.message}`;
        console.log('Error Occurred');
    } else {
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        console.log('Server returned code');
    }
    console.error(errorMessage);
    return throwError(errorMessage);
}

}


export interface merchantInfo{
  merchant_status: string;
  merchant_id: string;
  email_id: string;
} 


export interface merchantWebhook{
  payout_webhook: string;
  payin_webhook: string;
  url: string;
  merchant_id: number;
}