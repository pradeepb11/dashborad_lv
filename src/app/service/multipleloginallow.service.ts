import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError,  map,  tap } from 'rxjs/operators'; 
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const baseUrl = `${environment.apiUrl}`
const localUrl = `${environment.apiUrllocal}`

@Injectable({
  providedIn: 'root'
})
export class MultipleloginallowService {

  constructor(
    private _http: HttpClient
  ) { }


    retriveAllmultipleloginallow(): Observable<any>{
      return this._http.get<any>(`${localUrl}login_failed_data`, httpOptions)
      catchError(this.handleError)

    }

    loginAllow(user_id: number): Observable<any>{
      return this._http.post<any>(`${localUrl}multiple_login_allow`, {user_id}, httpOptions)
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


export interface loginallow{
 
  user_id: number;
}