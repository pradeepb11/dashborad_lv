import { Injectable } from '@angular/core';

const USER_KEY = 'loggedInUser';

@Injectable({
  providedIn: 'root'
})
export class TokenstorageService {

  constructor() { }

  signOut(): void{
    window.localStorage.clear();
  }

   // saveToken
   public saveToken(token: string): void{
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, token)

  }

  public getToken(): string | null {
    return window.localStorage.getItem(USER_KEY);
  }

  
}
