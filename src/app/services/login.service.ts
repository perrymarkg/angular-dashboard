import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {

    auth: Observable<firebase.User>;
    user: boolean | firebase.User;

    constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
        this.auth = this.firebaseAuth.authState;
        this.auth.subscribe( r => {
            if (r) {
                this.user = r;
            }
        });
    }

    login(email: string, password: string): Promise<{valid: boolean, message: string}> {
        return this.firebaseAuth.auth
        .signInWithEmailAndPassword(email, password)
        .then( r => {
            return {valid: true, message: ''};
        })
        .catch( r => {
            return {valid: false, message: r.message};
        });
    }

    logOut() {
        this.firebaseAuth.auth.signOut();
    }

}
