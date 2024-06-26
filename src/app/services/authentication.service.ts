import {inject, Injectable} from '@angular/core';
import {
  Auth, createUserWithEmailAndPassword,
  GoogleAuthProvider,
  IdTokenResult,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  user,
  User,
  UserCredential
} from '@angular/fire/auth';
import {Observable} from "rxjs";
import {LoginData} from "../data-model/interfaces/auth/login-data";
import {RegisterData} from "../data-model/interfaces/auth/register-data";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private auth = inject(Auth)
  public userObservable: Observable<User | null> = user(this.auth)

  /* Current User instance or null if not initialized or not authenticated */
  private user: User | null = null

  constructor() {
    this.userObservable.subscribe((userOrNull: User | null) => {
      this.user = userOrNull
    })
  }

  public logout(): Promise<void> {
    return signOut(this.auth)
  }

  public loginWithEmailAndPassword(loginData: LoginData): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, loginData.email, loginData.password)
  }

  public loginWithGoogleAccount(): Promise<UserCredential> {
    return signInWithPopup(this.auth, new GoogleAuthProvider())
  }

  public registerWithEmailAndPassword(registerData: RegisterData): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, registerData.email, registerData.password)
  }

  public getToken(): Promise<IdTokenResult> | null {
    return this.user?.getIdTokenResult() ?? null
  }

  public getErrorMessageByCode(code: string): string {
    return ERROR_CODE_DICTIONARY[code] ?? `Missing dictionary entry for ${code}.`
  }

  public isAuthenticated(): boolean {
    return !!this.user
  }
}

const ERROR_CODE_DICTIONARY: { [key: string]: string } = {
  "auth/invalid-email": "The email entered is invalid.",
  "auth/user-disabled": "The user account was disabled.",
  "auth/invalid-credential": "The credentials entered are invalid."
}
