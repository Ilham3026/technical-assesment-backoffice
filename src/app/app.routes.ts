import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./layout/app.layout.routes').then(r => r.LAYOUT_ROUTES) },
    { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
    { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
    { path: 'notfound', loadComponent: () => import('./demo/components/notfound/notfound.component').then(r => r.NotfoundComponent) },
    { path: '**', redirectTo: '/notfound' },
]
