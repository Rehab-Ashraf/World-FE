import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {};
    //here we can add token 
    if(request.method == "POST"){
      request = request.clone({
        headers: request.headers.set(
          "Content-Type",
          "application/json"
          ),
        });
      console.log(request)
    }
    request = request.clone({
      headers: request.headers.set("Accept", "*/*"),
    });
    const req = request.clone({ setHeaders: headersConfig });
    console.log(req)
    return next.handle(req);
  }


}
