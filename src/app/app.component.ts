import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Router, RouterOutlet } from '@angular/router';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { Utils } from './utils/utils';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [RouterOutlet, NgxUiLoaderModule]
})
export class AppComponent implements OnInit {

    constructor(
        private primengConfig: PrimeNGConfig, 
        private utils: Utils, 
        private router: Router
    ) { }

    ngOnInit() {
        this.utils.showLoading();
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
