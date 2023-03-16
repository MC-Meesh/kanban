import { Directive, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from "firebase/auth";
//import { FirebaseApp } from '@angular/fire/app';


const provider = new GoogleAuthProvider();

@Directive({
  selector: '[appGoogleSignin]'
})
export class GoogleSigninDirective {

  constructor(private afAuth: AngularFireAuth) {}

  @HostListener('click')
  onClick() {
    this.afAuth.signInWithPopup(new GoogleAuthProvider());
  }
}
