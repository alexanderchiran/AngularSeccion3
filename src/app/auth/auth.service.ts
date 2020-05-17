import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, Subject } from 'rxjs';

import { User } from './user.model';

export interface AuthResponseData {
  kind?: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  //user = new Subject<User>();
  private tokenExpirationTimer: any;
  
  signUpApiRestService='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=XXXXX'
  loginApiRestService='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=XXXXXX'

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * 
   * @param email Registrarse 
   * @param password 
   */
  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        this.signUpApiRestService,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.manejoError),
        tap(resData => {
          this.manejoAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  /**
   * Autenticarse
   * @param email 
   * @param password 
   */
  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        this.loginApiRestService,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.manejoError),
        tap(resData => {
          this.manejoAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  /**
   * Maneja el f5 del navegador 
   */
  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
      //accede al metodo token del user.model
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
        //se programa a expiración de a sesión
      this.autoLogout(expirationDuration);
    }
  }

  /**
   * botos de cerrar sesión
   */
  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    //remueve el usuario del almacenamiento local del browser
    localStorage.removeItem('userData');
    //otra opcion es 
    //localStorage.clear();

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  /**
   * cierrar la sesion cuando el token ya venció 
   * @param expirationDuration 
   */
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      console.log("Entra a cerrar la sesión de forma automática");
      this.logout();
    }, expirationDuration);
  }

  /**
   * Crea un objeto de tipo usuario cuando se autentica
   * @param email 
   * @param userId 
   * @param token 
   * @param expiresIn 
   */
  private manejoAuthentication(email: string,userId: string,token: string,expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    //aqui se programa la expiración de la cuenta 
    this.autoLogout(expiresIn * 1000);
    //almacenamiento local del browser 
    localStorage.setItem('userData', JSON.stringify(user));
  }

  /**
   * 
   * @param errorRes Manejo de errores firebase
   */
  private manejoError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}
