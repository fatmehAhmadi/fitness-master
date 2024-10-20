import { UiService } from './../shared/ui.service';
import { Injectable } from '@angular/core';
import { AuthData } from './auth.model';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user!: User | null;
  authChange = new Subject<boolean>();

  constructor(
    private router: Router,
    private fireAth: AngularFireAuth,
    private snackbar: MatSnackBar,
    private uiService: UiService
  ) {}

  register(auth: AuthData) {
    this.fireAth
      .createUserWithEmailAndPassword(auth.email, auth.password)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        this.snackbar.open(err.message, null, { duration: 4000 });
      });
    // this.user = {
    //   email: auth.email,
    //   userId: Math.round(Math.random() * 100).toString(),
    // };
    this.authAndRouting(true, '/training');
  }

  login(auth: AuthData) {
    this.uiService.loadingState.next(true);
    this.fireAth
      .signInWithEmailAndPassword(auth.email, auth.password)
      .then((userCredential) => {
        this.uiService.loadingState.next(false);
        // User successfully logged in
        console.log('User logged in:', userCredential.user);

        // this.user = {
        //   email: auth.email,
        //   userId: userCredential.user.uid,
        // };
        this.authAndRouting(true, '/training');
      })
      .catch((error) => {
        this.uiService.loadingState.next(false);
        this.snackbar.open(error.message, null, { duration: 4000 });
      });
  }

  logout() {
    this.fireAth.signOut(); // Rules: allow read, write:  if request.auth!=null;

    this.user = null;
    this.authAndRouting(false, '/login');
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    console.log(
      'user is full? and should it go to train?',

      this.user !== undefined
    );
    console.log('user:', this.user);

    return this.user !== undefined;
  }

  authAndRouting(isAuth: boolean, routlink: string) {
    this.authChange.next(isAuth);
    this.router.navigate([routlink]);
  }
}
