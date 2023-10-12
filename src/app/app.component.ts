import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Router, RouterOutlet } from '@angular/router';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { Utils } from './utils/utils';
import { EmployeeService } from './service/employee.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [RouterOutlet, NgxUiLoaderModule]
})
export class AppComponent implements OnInit {

    constructor(
        private employeeService: EmployeeService, 
        private primengConfig: PrimeNGConfig, 
        private utils: Utils, 
        private router: Router
    ) { }

    ngOnInit() {
        this.utils.showLoading();
        this.employeeService.getEmployees().then(data => this.employeeService.employees = data);

        var isLogin = this.utils.getLocalStorage('isLogin');

        if(isLogin != 'true'){
            this.router.navigate(['login'],{});
        }
        
        setTimeout(() => {
            this.utils.hideLoading();
        }, 500);
        
        this.primengConfig.ripple = true;
    }
}
