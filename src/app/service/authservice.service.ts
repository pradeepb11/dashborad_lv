import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Users} from '../interface/users';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const baseUrl = `${environment.apiUrl}`


@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  private loggedUserSubject: BehaviorSubject<Users>;
  public loggedInUser: Observable<Users>;


  constructor(
    private http: HttpClient,
  ) { 
    this.loggedUserSubject = new BehaviorSubject<Users>(JSON.parse(localStorage.getItem('loggedInUser') || '{}'));
    this.loggedInUser = this.loggedUserSubject.asObservable();
  }

  
  // loginUser
  loginUser(username: string, password:string): Observable<any>{
    return this.http.post<any>(`${baseUrl}auth/login`, {username, password}, httpOptions)
    .pipe(map(
      (res) =>{
        // console.log(res)
        if(res.response.status === 'success'){
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('loggedInUser', JSON.stringify(res));
        this.loggedUserSubject.next(res);
        }else{
         localStorage.removeItem('loggedInUser');
          }
        return res;
      }
      
    ))
  }


   // Logout User
   logOutUsers() {
    localStorage.removeItem('loggedInUser');
    this.loggedUserSubject.next(null!);

  }



}
