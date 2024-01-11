import { Routes } from '@angular/router';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { HomeComponent } from './home/home.component';
import { ImprintComponent } from './imprint/imprint.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    {path: '', component: HomeComponent, title: 'Max Schuh | Portfolio'},
    {path: 'home', component: HomeComponent, title: 'Max Schuh | Portfolio'},
    {path: 'imprint', component: ImprintComponent, title: 'Max Schuh | Imprint'},
    {path: 'privacy-policy', component: PrivacyPolicyComponent, title: 'Max Schuh | Privacy Policy'},
    {path: '**', component: PageNotFoundComponent, title: 'Max Schuh | Page not found'}
];
