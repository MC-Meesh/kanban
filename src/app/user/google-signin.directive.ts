import { Directive, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

@Directive({
  selector: '[appAuth]'
})
export class GoogleSigninDirective {

  constructor(private afAuth: AngularFireAuth) {}

  @HostListener('click')
  onClick() {
    this.afAuth.signInWithPopup(new GoogleAuthProvider());
  }
}
