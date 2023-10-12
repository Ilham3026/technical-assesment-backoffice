import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { RouterOutlet } from '@angular/router';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { Utils } from './utils/utils';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [RouterOutlet, NgxUiLoaderModule]
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig, private utils: Utils) { }

    ngOnInit() {
        this.utils.showLoading();
        
        setTimeout(() => {
            this.utils.hideLoading();
        }, 500);
        
        this.primengConfig.ripple = true;
    }
}
