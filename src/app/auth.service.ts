import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {auth} from 'firebase/app';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isLoggedIn: boolean;
    public authInfo: Observable<firebase.User>;

    constructor(private afAuth: AngularFireAuth,
                private _router: Router) {
        this.authInfo = this.afAuth.authState;
        this.isUser().subscribe();
    }

    loginWithGoogle() {
        const provider = new auth.GoogleAuthProvider();
        return this.afAuth.auth.signInWithPopup(provider);
    }

    logout() {
        return this.afAuth.auth.signOut();
    }

    isUser(): Observable<boolean> {
        return this.authInfo.pipe(
            map(user => {
                if (user) {
                    return this.isLoggedIn = true;
                } else {
                    return this.isLoggedIn = false;
                }
            })
        );
    }
}
