import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private apiService:ApiService) { }
  getAllCountries(pageNumber , pageSize,sortColumn?,sortOrder?,filterColumn?, keyword?){
    var params = new HttpParams()
                     .set("PageNumber",pageNumber)
                     .set("PageSize",pageSize)
    if(sortColumn){
      params.set("sortColumn",sortColumn)
    }
    if(sortOrder){
      params.set("sortOrder",sortOrder)
    }
    if(filterColumn){
      params.set("filterColumn",filterColumn)
    }
    if(keyword){
      params.set("filterQuery",keyword)
    }
    return this.apiService.get(`Countries`,params);
  }
}
