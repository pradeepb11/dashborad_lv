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
export class PayoutchargesService {

  constructor(
    private _http: HttpClient
  ) { }

  filterDailypayoutCharges(payoutcharge:payoutChargesData): Observable<any>{
    return this._http.post<any>(`${baseUrl}payout_charge_list`, payoutcharge, httpOptions)
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


export interface payoutChargesData{
  date: string;
  merchant_id: string;
}
