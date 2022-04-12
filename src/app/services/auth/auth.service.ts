import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "@angular/fire/auth";

import { concatMap, from, Observable, of } from "rxjs";

import firebase from "firebase/compat";
import UserInfo = firebase.UserInfo;


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser$ = authState(this.auth);

  constructor(private auth: Auth) { }

  login(username: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }

  signup(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  updateProfileData(profileData: Partial<UserInfo>): Observable<any> {
    const user = this.auth.currentUser;

    return of(user).pipe(
      concatMap(user => {
        if (!user) throw new Error('Not authenticated!');
        return updateProfile(user, profileData);
      })
    )
  }

  logout() {
    return from(this.auth.signOut());
  }
}
