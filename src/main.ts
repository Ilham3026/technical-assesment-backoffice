import { enableProdMode, importProvidersFrom } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { InMemoryScrollingFeature, InMemoryScrollingOptions, provideRouter, 
  withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from './environments/environment';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { EmployeeService } from './app/service/employee.service';


const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled'
};
const inMemoryScrollingFeature: InMemoryScrollingFeature = withInMemoryScrolling(scrollConfig);

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        // importProvidersFrom(AppRoutingModule),
        importProvidersFrom(BrowserModule, BrowserAnimationsModule),
        provideRouter(routes, inMemoryScrollingFeature, withComponentInputBinding()),
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        { provide: LocationStrategy, useClass: HashLocationStrategy }, 
        MessageService, ConfirmationService, EmployeeService 
    ]
})
  .catch(err => console.error(err));
