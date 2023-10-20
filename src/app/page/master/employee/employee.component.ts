import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedModule } from 'primeng/api';
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
import { Utils } from 'src/app/utils/utils';

@Component({
    templateUrl: './employee.component.html',
    providers: [],
    standalone: true,
    imports: [CommonModule, ...moduleTable, ...Form, ...Message, ToolbarModule, SharedModule, FormsModule]
})
export class EmployeeComponent implements OnInit {

    @ViewChild('dt', { static: false }) table: Table
    
    constant = Constant; messages = Messages; label = Label;

    deleteEmployeeDialog: boolean = false;

    deleteEmployeesDialog: boolean = false;

    searchDialog: boolean = false;
    
    validEmail: boolean = false;

    employees: Employee[] = [];

    selectedEmployees: Employee[] = [];

    submitted: boolean = false;

    searchAll: string = '';

    searchValue: Employee = {};

    searchAllFilter: any = [];

    cols: any[] = [];

    statuses: any[] = [];

    group: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private employeeService: EmployeeService, 
        private utils: Utils, 
        private router: Router
    ) { }

    ngOnInit() {
        this.employees = this.employeeService.employees;

        var hData = history.state.data;
        if(hData){
            this.employees.unshift(history.state.data);
        }

        var hSearch = history.state.search;
        if(hSearch){
            setTimeout(() => {
                this.searchAllFilter.forEach(element => {
                    if(hSearch[element]) {
                        this.searchValue[element] = hSearch[element];
                        this.table.filter(hSearch[element], this.constant[element], this.constant.matchMode);
                    }
                });
            }, 500);
        }

        var hSearchAll = history.state.searchAll;
        if(hSearchAll){
            setTimeout(() => {
                if(hSearchAll){this.searchAll = hSearchAll; this.table.filterGlobal(hSearchAll, this.constant.matchMode);}
            }, 500);
        }

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
    }

    openNew() {
        this.router.navigate(['master/form-employee'], {});
    }

    detailEmployee(employee: any) {
        this.router.navigate(['master/detail-employee'], { state: {
            data:employee, 
            search:this.searchValue, 
            searchAll:this.searchAll
        } });
    }

    deleteSelectedEmployees() {
        this.deleteEmployeesDialog = true;
    }

    editEmployee() {
        this.utils.showNotification(this.messages.warning_type, this.messages.success_title, this.messages.updated_employee);
    }

    deleteEmployee() {
        this.deleteEmployeeDialog = true;
    }

    confirmDeleteSelected() {
        this.deleteEmployeesDialog = false;
        this.utils.showNotification(this.messages.error_type, this.messages.success_title, this.messages.delete_employees);
        this.selectedEmployees = [];
    }

    confirmDelete() {
        this.deleteEmployeeDialog = false;
        this.utils.showNotification(this.messages.error_type, this.messages.success_title, this.messages.delete_employee);
    }

    validateEmail(dt: any) {
        !dt?this.validEmail=true:this.validEmail=false;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, this.constant.matchMode);
    }

    onFilter(table: Table, event: Event, field: string) {
        table.filter((event.target as HTMLInputElement).value, field, this.constant.matchMode);
    }

    clearSearch(dt: Table) {
        dt.reset();
        this.searchValue = {};
        this.searchAll = '';
    }
}
