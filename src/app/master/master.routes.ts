import { Routes } from "@angular/router";

export const MASTER_ROUTES: Routes = [
    {
        path: '',
        children: [
            { path: 'table', data: { breadcrumb: 'demo' }, loadComponent: () => import('./demo/table/table.component').then(r => r.TableComponent) },
            { path: 'form', data: { breadcrumb: 'demo' }, loadComponent: () => import('./demo/form/form.component').then(r => r.FormComponent) }
        ]
    },
]