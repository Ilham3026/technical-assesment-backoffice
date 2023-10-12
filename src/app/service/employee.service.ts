import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../api/employee';

@Injectable()
export class EmployeeService {

    public employees: Employee[] = [];

    constructor(private http: HttpClient) { }

    getEmployees() {
        return this.http.get<any>('assets/data/employee.json')
            .toPromise()
            .then(res => res.employee as Employee[])
            .then(data => data);
    }

}
