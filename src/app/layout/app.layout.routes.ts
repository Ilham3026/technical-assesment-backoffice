import { Routes } from "@angular/router";

export const LAYOUT_ROUTES: Routes = [
    {
        path: '', loadComponent: () => import('./app.layout.component').then(r => r.AppLayoutComponent),
        children: [
            { path: '', loadChildren: () => import('../demo/components/dashboard/dashboard.module').then(r => r.DashboardModule) },
            { path: 'master', loadChildren: () => import('../master/master.routes').then(r => r.MASTER_ROUTES) },
            { path: 'uikit', loadChildren: () => import('../demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
            { path: 'utilities', loadChildren: () => import('../demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
            { path: 'documentation', loadChildren: () => import('../demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
            { path: 'blocks', loadChildren: () => import('../demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
            { path: 'pages', loadChildren: () => import('../demo/components/pages/pages.module').then(m => m.PagesModule) }
        ]
    }
]