import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

import { catchError } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private formatErrors(error:any){
    return throwError(error.error);
  }

  get( path:string , params:HttpParams = new HttpParams()):Observable<any>{
    return this.http.get(`${environment.URL_API}${path}`,{params})
    .pipe(catchError(this.formatErrors));
  }

  post( path:string , body: object = {}):Observable<any>{
    return this.http.post(`${environment.URL_API}${path}`, JSON.stringify(body))
    .pipe(catchError(this.formatErrors))
  }

  put( path:string , body:object = {}):Observable<any>{
    return this.http.put(`${environment.URL_API}${path}`, JSON.stringify(body))
    .pipe(catchError(this.formatErrors))
  }

  delete( path:string):Observable<any>{
    return this.http.delete(`${environment.URL_API}${path}`)
    .pipe(catchError(this.formatErrors))
  }
}
