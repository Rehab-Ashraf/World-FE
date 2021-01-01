import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaderResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { NgxSpinnerService } from 'ngx-spinner';
import { retry, catchError, timeout, map } from "rxjs/operators";
import { error } from 'protractor';


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  toaster: MatSnackBar;
  spinner: NgxSpinnerService;
  router: Router;

  constructor(private injector: Injector) {
    setTimeout(() => {
      this.toaster = this.injector.get(MatSnackBar);
      this.spinner = this.injector.get(NgxSpinnerService);
      this.router = this.injector.get(Router);
    });
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry(0),
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpHeaderResponse) {
        }
        return event;
      }),
      catchError((error:HttpErrorResponse)=>{
        let errorMessage = "";
        switch (error.status) {
          case 404:
            errorMessage = `Error Code: ${error.status}\nMessage: Not Found`;
            break;
          case 500:
            errorMessage = `حدثت مشكلة بالسيرفر`;
            break;
          default:
            errorMessage = "unknown error";
            break;
        }
        this.spinner.hide;
        this.toaster.open(errorMessage, "", {
          duration: 4000,
          panelClass: ["error-alert"],
        });
        return throwError(error)
      })
    );
  }
}
