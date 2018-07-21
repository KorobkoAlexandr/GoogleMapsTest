import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { AuthComponent } from './auth/auth.component';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
    {path: 'auth', component: AuthComponent},
    {path: 'main', component: MainComponent, canActivate: [AuthGuard]},
    {path: 'about', component: AboutComponent, canActivate: [AuthGuard]},
    {path: '', redirectTo: '/auth', pathMatch: 'full'},
    {path: '**', component: AuthComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        AboutComponent,
        AuthComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(routes, { enableTracing: false}),
        AngularFireModule.initializeApp(environment.fireConfig),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
