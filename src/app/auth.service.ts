import {inject, Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from '@angular/fire/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth)
  register(email: string, password: string, username: string): Observable<void>{
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then((response) =>
      updateProfile(response.user, {displayName: username}),
    );
    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(() => {});

    return from(promise);
  }

  logout():Observable<void >{
    const promise = signOut(this.firebaseAuth);
    return from(promise);
  }

}
