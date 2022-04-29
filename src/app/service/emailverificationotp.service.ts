import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError,  map,  tap } from 'rxjs/operators'; 
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


const baseUrl = `${environment.apiUrl}`
// const baseUrl = `${environment.apiUrllocal}`

@Injectable({
  providedIn: 'root'
})
export class EmailverificationotpService {

  constructor(
    private _http: HttpClient
  ) { }


  merchantDataFilter(emailverifyinfo: emailVerifyInfo): Observable<any>{

    return this._http.post(`${baseUrl}email_verification_list`, emailverifyinfo, httpOptions)
    catchError(this.handleError)

  }
  
  merchantDataRetrive(): Observable<any>{
    return this._http.get(`${baseUrl}get_email_verification_list`, httpOptions)
    catchError(this.handleError)
  }

  sendEmailData(sendemail: sendEmailInfo): Observable<any>{
    return this._http.post(`${baseUrl}send_email`, sendemail, httpOptions)
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


export interface emailVerifyInfo{
  email_id: string;
} 

export interface sendEmailInfo{
  sender_id: string;
  receiver_id: string;
  body: string;
  subject: string;
  sender_name: string;
  receiver_name: string;
} 

export interface verifiactionEmail{
  code: number;
  email: string;
  email_verification_id: string;
  name: string;
  reserved: string;
  timestamp: string;
  user_id: string;
}