import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError,  map,  tap } from 'rxjs/operators'; 
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const baseUrl = `${environment.apiUrl}`

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private _http: HttpClient
  ) { }

  dateWiseAmtReport(): Observable<any>{
    return this._http.get('./assets/json/datewise.json', httpOptions)
    catchError(this.handleError)
  }

  payoutReport(timestamp: Timestamp): Observable<any>{
    return this._http.post<any>('http://43.204.55.13:3000/api/payoutreport/', timestamp, httpOptions)
    catchError(this.handleError)
  }

  payoutreportsucess(): Observable<any>{
    return this._http.get<any>('http://43.204.55.13:3000/api/payoutreport/success', httpOptions)
    catchError(this.handleError);
    
  }
  payoutReportFailur(): Observable<any>{
    return this._http.get<any>('http://43.204.55.13:3000/api/payoutreport/failure', httpOptions)
    catchError(this.handleError);
  }

  payinReport(timestampReport: TimeStampReport): Observable<any>{
    return this._http.post<any>('http://43.204.55.13:3000/api/payinReport/', timestampReport, httpOptions)
    catchError(this.handleError)
  }

  payinReportSuccess(): Observable<any>{
    return this._http.get<any>('http://43.204.55.13:3000/api/payinreport/success', httpOptions)
    catchError(this.handleError)
  }

  payinReportFailure(): Observable<any>{
    return this._http.get<any>('http://43.204.55.13:3000/api/payinreport/failure', httpOptions)
    catchError(this.handleError);
  }

  // data fetch month latest month wise Payout Report
  payoutMonthReport(): Observable<any>{
    return this._http.get<any>('http://43.204.55.13:3000/api/payoutreport/payoutmonthReport' , httpOptions)
    catchError(this.handleError);
  }

  // data fetch month latest month wise PayinReport 
  payinMonthReport(): Observable<any>{
    return this._http.get<any>('http://43.204.55.13:3000/api/payinReport/payinmonthReport' , httpOptions)
    catchError(this.handleError);
  }

  // system Alert no of transaction is greatehr than 100 then alert message show
  SYSalertReport(): Observable<any>{
    return this._http.get('http://43.204.55.13:3000/api/sysalert', httpOptions)
    catchError(this.handleError)
  } 

  SysAlertReportPayout(): Observable<any>{
    return this._http.get('http://43.204.55.13:3000/api/sysalert/payoutAlert', httpOptions)
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
  start_date: string;
  end_date: string;
} 

export interface TimeStampReport{
  start_date: string;
  end_date: string;
}