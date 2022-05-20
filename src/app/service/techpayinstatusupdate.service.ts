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
export class TechpayinstatusupdateService {

  constructor(
    private _http: HttpClient
  ) { }

  
// get payin status Update Api
getPayinStatusUpdate(data:Timestamp): Observable<any>{
  return this._http.post<any>('http://43.204.55.13:8080/PayinStatusUpdateAPI', data, httpOptions)
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


export interface Timestamp{
  transactionid: string;
  transactionrefno: string;
  paypageid: string;
} 
