import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError,  map,  tap } from 'rxjs/operators'; 
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',   'Access-Control-Allow-Origin':'*' },)
};

const baseUrl = `${environment.apiUrl}`
// const localUrl = `${environment.apiUrllocal}`


@Injectable({
  providedIn: 'root'
})
export class TechpayinstatusupdateService {

  constructor(
    private _http: HttpClient
  ) { }

  
// get payin status Update Api
getPayinStatusUpdate(data:Timestamp): Observable<any>{
  return this._http.post<any>('http://43.204.55.13:5000/StatusUpdate', data, httpOptions)
  catchError(this.handleError)

}

// getPayinStatusEdit
getPayinStatusEdit(Transaction_id:any,Transaction_Status:any): Observable<any>{
  return this._http.put<any>(`http://43.204.55.13:5000/StatusEdit`, Transaction_id, Transaction_Status)
  catchError(this.handleError);
}



// // get payin status Update Api
// getPayinStatusUpdate(data:Timestamp): Observable<any>{
//   return this._http.post<any>('http://43.204.55.13:5000/PayinStatusUpdateAPI', data, httpOptions)
//   catchError(this.handleError)

// }


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


export interface Timestamp{
  transactionid: string;
  transactionrefno: string;
  paypageid: string;
} 


export interface statusEdit{
  txn_id:number,
  transaction_status: string;
}