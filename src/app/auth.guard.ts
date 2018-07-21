import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {filter, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService,
                private router: Router) {
        console.log('AuthGuard constructor ');
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.authInfo.pipe(
            filter(user => user !== null),
            map(user => {
                if (user) {
                    return true;
                } else {
                    this.router.navigate(['/auth']);
                    return false;
                }
            })
        );
    }
}
