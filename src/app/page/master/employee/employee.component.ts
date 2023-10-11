import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/api/employee';
import { MessageService, SharedModule } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { EmployeeService } from 'src/app/service/employee.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { NgIf, NgClass, CurrencyPipe, DatePipe } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';

@Component({
    templateUrl: './employee.component.html',
    providers: [MessageService],
    standalone: true,
    imports: [ToastModule, ToolbarModule, SharedModule, ButtonModule, RippleModule, FileUploadModule, TableModule, InputTextModule, RatingModule, FormsModule, DialogModule, NgIf, NgClass, InputTextareaModule, DropdownModule, RadioButtonModule, InputNumberModule, CurrencyPipe, DatePipe]
})
export class EmployeeComponent implements OnInit {

    employeeDialog: boolean = false;

    deleteEmployeeDialog: boolean = false;

    deleteEmployeesDialog: boolean = false;

    employees: Employee[] = [];

    employee: Employee = {};

    selectedEmployees: Employee[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    group: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private employeeService: EmployeeService, private messageService: MessageService) { }

    ngOnInit() {
        this.employeeService.getEmployees().then(data => this.employees = data);

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
    }

    deleteSelectedEmployees() {
        this.deleteEmployeesDialog = true;
    }

    editEmployee(employee: Employee) {
        this.employee = { ...employee };
        this.employeeDialog = true;
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

    saveEmployee() {
        this.submitted = true;

        if (this.employee.username?.trim()) {
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
}
