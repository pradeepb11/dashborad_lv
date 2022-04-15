import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization'
  })
};


const baseUrl = `${environment.apiUrl}`;


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(
    private http: HttpClient
  ) { }


  createRegistration(basicinfo: Basicinfo): Observable<Basicinfo>{

    return this.http.post<Basicinfo>(`${baseUrl}auth/register`, basicinfo, httpOptions)
    .pipe(map(
      (res) => {
        //  console.log(res);
         if (res) {
          // console.log(res);
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          // localStorage.setItem('nupayData', JSON.stringify(res));
          // this.loggedUserSubject.next(res);
        }

        return res;
      }
    ))
  }


}


export interface Basicinfo{
  status: string;
  response: any;
  first_name: string;
  last_name:string;
  mobile:string;
  password:string;
  email: string;
  detail:{
    email:string;
    mobile:string;
  };

}
