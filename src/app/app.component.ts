import {Component} from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(public _aS: AuthService,
                private router: Router,
                private afAuth: AngularFireAuth) {
    }

    logoutFromGoogle() {
        this._aS.logout().then(() => {
            this.router.navigate(['/auth']);
        });
    }

    loginGoogle() {
        this._aS.loginWithGoogle().then(() => {
                this.router.navigate(['/main']);
            }
        );
    }
}
