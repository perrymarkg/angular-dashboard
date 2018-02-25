import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class LoginService {

    private loggedIn: boolean = false;

    constructor(private firebaseAuth: AngularFireAuth){
        this.firebaseAuth.authState.subscribe( s => {
            if( s )
                this.loggedIn = true
        })
    }

    authState(){
        return this.firebaseAuth.authState
    }

    isLoggedIn(){
        let sub = this.firebaseAuth.authState.subscribe( s => {
            return s ? true : false;
        })
        return sub;
    }

    login(email: string, password: string):Promise<{valid:boolean, message:string}>{
        return this.firebaseAuth.auth
        .signInWithEmailAndPassword(email, password)
        .then( r => {
            return {valid: true, message:''}
        })
        .catch( r => {
            return {valid: false, message:r.message}
        })
    }

}