import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService, SharedModule } from 'primeng/api';
import { Table } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { Employee } from 'src/app/api/employee';
import { EmployeeService } from 'src/app/service/employee.service';
import { Table as moduleTable } from 'src/app/shared/module/table';
import { Form } from 'src/app/shared/module/form';
import { Message } from 'src/app/shared/module/message';
import { Constant } from 'src/app/config/constant';
import { Messages } from 'src/app/config/messages';
import { Label } from 'src/app/config/label';

@Component({
    templateUrl: './employee.component.html',
    providers: [MessageService],
    standalone: true,
    imports: [CommonModule, ...moduleTable, ...Form, ...Message, ToolbarModule, SharedModule, FormsModule]
})
export class EmployeeComponent implements OnInit {

    constant = Constant; messages = Messages; label = Label;

    today: Date = new Date();

    employeeTitleDialog: boolean = false;

    employeeDialog: boolean = false;

    deleteEmployeeDialog: boolean = false;

    deleteEmployeesDialog: boolean = false;

    searchDialog: boolean = false;
    
    validEmail: boolean = false;

    employees: Employee[] = [];

    employee: Employee = {};

    selectedEmployees: Employee[] = [];

    submitted: boolean = false;

    searchAll: string = '';

    searchValue: Employee = {};

    searchAllFilter: any = [];

    cols: any[] = [];

    statuses: any[] = [];

    group: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private employeeService: EmployeeService, private messageService: MessageService) { }

    ngOnInit() {
        this.employeeService.getEmployees().then(data => this.employees = data);

        this.searchAllFilter = [
            'username',
            'firstName',
            'lastName',
            'email',
            'birthDate',
            'basicSalary',
            'status',
            'group',
            'description'
        ];

        this.cols = [
            { field: 'username', header: 'Username' },
            { field: 'firstName', header: 'First Name' },
            { field: 'lastName', header: 'Last Name' },
            { field: 'email', header: 'Email' },
            { field: 'birthDate', header: 'Birth Date' },
            { field: 'basicSalary', header: 'Basic Salary' },
            { field: 'status', header: 'Status' },
            { field: 'group', header: 'Group' },
            { field: 'description', header: 'Description' }
        ];

        this.statuses = [
            { label: 'ACTIVE', value: 'active' },
            { label: 'INACTIVE', value: 'inactive' }
        ];

        this.group = [
            { label: 'HR', value: 'hr' },
            { label: 'IT', value: 'it' },
            { label: 'Finance', value: 'finance' },
            { label: 'Operation', value: 'operation' },
            { label: 'GA', value: 'ga' },
            { label: 'Sales', value: 'sales' },
            { label: 'Marketing', value: 'marketing' },
            { label: 'Production', value: 'production' },
            { label: 'Purchasing', value: 'purchasing' },
            { label: 'R&D', value: 'rnd' }
        ];
    }

    openNew() {
        this.employee = {};
        this.submitted = false;
        this.employeeDialog = true;
        this.employeeTitleDialog = true;
    }

    deleteSelectedEmployees() {
        this.deleteEmployeesDialog = true;
    }

    editEmployee(employee: Employee) {
        this.employee = { ...employee };
        this.employeeDialog = true;
        this.employeeTitleDialog = false;
    }

    deleteEmployee(employee: Employee) {
        this.deleteEmployeeDialog = true;
        this.employee = { ...employee };
    }

    confirmDeleteSelected() {
        this.deleteEmployeesDialog = false;
        this.employees = this.employees.filter(val => !this.selectedEmployees.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employees Deleted', life: 3000 });
        this.selectedEmployees = [];
    }

    confirmDelete() {
        this.deleteEmployeeDialog = false;
        this.employees = this.employees.filter(val => val.id !== this.employee.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employee Deleted', life: 3000 });
        this.employee = {};
    }

    hideDialog() {
        this.employeeDialog = false;
        this.submitted = false;
    }

    validateEmail(dt: any) {
        !dt?this.validEmail=true:this.validEmail=false;
    }

    saveEmployee() {
        this.submitted = true;

        if (this.employee.username?.trim() && this.employee.firstName?.trim() && this.employee.lastName?.trim() && 
            this.employee.email?.trim() && this.validEmail && this.employee.status) {
            if (this.employee.id) {
                // @ts-ignore
                this.employee.inventoryStatus = this.employee.inventoryStatus.value ? this.employee.inventoryStatus.value : this.employee.inventoryStatus;
                this.employees[this.findIndexById(this.employee.id)] = this.employee;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employee Updated', life: 3000 });
            } else {
                this.employee.id = this.createId();
                // @ts-ignore
                this.employee.inventoryStatus = this.employee.inventoryStatus ? this.employee.inventoryStatus.value : 'INSTOCK';
                this.employees.push(this.employee);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employee Created', life: 3000 });
            }

            this.employees = [...this.employees];
            this.employeeDialog = false;
            this.employee = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.employees.length; i++) {
            if (this.employees[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    onFilter(table: Table, event: Event, field: string) {
        table.filter((event.target as HTMLInputElement).value, field, 'contains');
    }

    clearSearch(dt: Table) {
        dt.reset();
        this.searchValue = {};
        this.searchAll = '';
    }
}
