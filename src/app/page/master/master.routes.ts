import { Routes } from "@angular/router";

export const MASTER_ROUTES: Routes = [
    {
        path: '',
        children: [
            { path: 'employee', data: { breadcrumb: 'Employee' }, loadComponent: () => import('./employee/employee.component').then(r => r.EmployeeComponent) }
        ]
    },
]