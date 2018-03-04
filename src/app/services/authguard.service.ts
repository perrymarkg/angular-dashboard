import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
  } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable()
export class AuthGuard implements CanActivate {

    private loggedIn = new Observable();
    constructor(private loginService: LoginService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return new Observable( observer => {
            this.loginService.auth.subscribe( (result) => {
                if ( result ) {
                    observer.next(true);
                    observer.complete();
                } else {
                    observer.next(false);
                    observer.complete();
                    this.router.navigate(['/login']);
                }
            });

        });
    }
}
