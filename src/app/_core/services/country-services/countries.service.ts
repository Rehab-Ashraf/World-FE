import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private apiService:ApiService) { }
  getAllCountries(pageNumber , pageSize,sortColumn,sortOrder,filterColumn , keyword){
    var params = new HttpParams()
                     .set("PageNumber",pageNumber)
                     .set("PageSize",pageSize)
                     .set("sortColumn",sortColumn)
                     .set("sortOrder",sortOrder)
                     .set("filterColumn",filterColumn)
                     .set("filterQuery",keyword)
    return this.apiService.get(`Countries`,params);
  }
}
