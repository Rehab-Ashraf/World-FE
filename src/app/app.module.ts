import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './_shared/layout/header/header.component';
import { FooterComponent } from './_shared/layout/footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpHeaderInterceptor } from './_core/interceptors/http-header.interceptor';
import { HttpErrorInterceptor } from './_core/interceptors/http-error.interceptor';
import { ToasterComponent } from './_shared/toaster/toaster.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { SharedModule } from './_shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent, 
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatSnackBarModule,
    SharedModule
  ],
  providers: [
    Location,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
      deps: [Injector],
    },
    ToasterComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
