import { Routes } from "@angular/router";

export const MASTER_ROUTES: Routes = [
    {
        path: '',
        children: [
            { 
                path: 'employee', 
                data: { breadcrumb: 'Employee' }, 
                loadComponent: () => import('./employee/employee.component').then(r => r.EmployeeComponent) 
            },
            { 
                path: 'detail-employee', 
                data: { breadcrumb: 'Detail Employee' }, 
                loadComponent: () => import('./employee/detail-employee/detail-employee.component').then(r => r.DetailEmployeeComponent) 
            },
            { 
                path: 'form-employee', 
                data: { breadcrumb: 'Form Employee' }, 
                loadComponent: () => import('./employee/form-employee/form-employee.component').then(r => r.FormEmployeeComponent) 
            }
        ]
    },
]