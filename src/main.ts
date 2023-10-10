import { enableProdMode, importProvidersFrom } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { InMemoryScrollingFeature, InMemoryScrollingOptions, provideRouter, 
  withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from './environments/environment';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { ProductService } from './app/demo/service/product.service';
import { PhotoService } from './app/demo/service/photo.service';
import { NodeService } from './app/demo/service/node.service';
import { IconService } from './app/demo/service/icon.service';
import { EventService } from './app/demo/service/event.service';
import { CustomerService } from './app/demo/service/customer.service';
import { CountryService } from './app/demo/service/country.service';


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
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService, MessageService, ConfirmationService
    ]
})
  .catch(err => console.error(err));
