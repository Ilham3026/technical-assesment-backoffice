import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/api/employee';
import { Table as moduleTable } from 'src/app/shared/module/table';
import { Form } from 'src/app/shared/module/form';
import { Message } from 'src/app/shared/module/message';
import { ToolbarModule } from 'primeng/toolbar';
import { SharedModule } from 'primeng/api';
import { Constant } from 'src/app/config/constant';
import { Messages } from 'src/app/config/messages';
import { Label } from 'src/app/config/label';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-form-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, ...moduleTable, ...Form, ...Message, ToolbarModule, SharedModule],
  templateUrl: './form-employee.component.html'
})
export class FormEmployeeComponent implements OnInit {

  constant = Constant; messages = Messages; label = Label;
  
  today: Date = new Date();

  employee: Employee = {};

  submitted: boolean = false;

  validEmail:boolean = false;

  statuses: any[] = [];

  group: any[] = [];

  constructor(private utils: Utils, private router: Router) { }

  ngOnInit(): void {
    
    this.statuses = [
      { label: 'ACTIVE', value: 'active' },
      { label: 'INACTIVE', value: 'inactive' }
    ];

    this.group = [
      { label: 'HRD', value: 'hrd' },
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

  validateEmail(dt: any) {
    !dt?this.validEmail=true:this.validEmail=false;
  }
  
  saveEmployee() {
    this.submitted = true;

    if (this.employee.username?.trim() && this.employee.firstName?.trim() && this.employee.lastName?.trim() && 
      this.employee.email?.trim() && this.validEmail && this.employee.status) {

      this.employee.id = this.createId();
      this.utils.showNotification(this.messages.success_type, this.messages.success_title, this.messages.created_employee);
      this.router.navigate(['master/employee'], { state:{data:this.employee} });
    }
  }

  createId(): string {
      let id = '';
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 5; i++) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
  }

  backToEmployee() {
    this.router.navigate(['master/employee'], {});
  }

}
